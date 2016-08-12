import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';
import { AngularFire } from 'angularfire2';
import {
  Competition,
  CompetitionProblem,
  CompetitionScoreboard,
  CompetitionScoreboardRanking,
  MySubmission,
  Problem,
  SuccessfulSubmission,
  TestCase,
  User
} from '../';

@Injectable()
export class RepositoryService {
  constructor(private af: AngularFire) { }

  getUser(uid: string): Observable<User> {
    return this.af.database.object(`/users/${uid}`).map(
        snapshot => snapshot.$value !== null
            ? snapshot as User
            : null);
  }

  getProblem(id: string): Observable<Problem> {
    return this.af.database.object(`/problems/${id}`);
  }

  getTestCases(problemId: string): Observable<TestCase[]> {
    return this.af.database.object(`/tests/${problemId}`);
  }

  getTopProblems(numProblems: number): Observable<Problem[]> {
    return this.af.database.list('/problems')
        .take(numProblems);
  }

  getSubmissions(userId: string, problemId: string): Observable<MySubmission[]> {
    return this.af.database.list(`/submissions/${userId}/${problemId}`, {
      query: {
        orderByChild: 'submittedOn'
      }
    }).map(submissions => submissions.reverse());
  }

  getCompetitions(): Observable<Competition[]> {
    return this.af.database.list(`/competitions`)
        .map(competitionsSnapshot => competitionsSnapshot
            .map(competitionSnapshot => Competition.fromSnapshot(competitionSnapshot)));
  }

  getCompetition(competitionId: string): Observable<Competition> {
    return this.af.database.object(`/competitions/${competitionId}`)
        .map(snapshot => snapshot.$value !== null
            ? Competition.fromSnapshot(snapshot)
            : null);
  }

  getCompetitionProblem(competitionId: string, problemId: string): Observable<CompetitionProblem> {
    return this.af.database.object(`/competitionProblems/${competitionId}/${problemId}`);
  }

  getCompetitionProblems(competitionId: string): Observable<CompetitionProblem[]> {
    return this.af.database.list(`/competitionProblems/${competitionId}`)
        .map(listSnapshot => listSnapshot
            .map(snapshot => CompetitionProblem.fromSnapshot(snapshot)));
  }

  // getCompetitionScoreboard(competitionId: string)//: Observable<CompetitionScoreboard> {
  //   return this.af.database.object(`/competitionScoreboards/${competitionId}`)
  //       .flatMap(snapshot => {
  //         let rankings = [];
  //         for (let uid in snapshot) {
  //           if (snapshot.hasOwnProperty(uid)) {
  //             let info = snapshot[uid];
  //             rankings.push({
  //               uid: uid,
  //               problemsSolved: info.problemsSolved,
  //               timeScore: info.timeScore
  //             });
  //           }
  //         }
  //         let resolveAllUsers: Promise<CompetitionScoreboardRanking>[] = rankings.map(ranking =>
  //             this.getUser(ranking.uid)
  //                 .map(user => {
  //                   return {
  //                     user: user,
  //                     problemsSolved: ranking.problemsSolved,
  //                     timeScore: ranking.timeScore
  //                   };
  //                 }).toPromise());
  //         return Observable.fromPromise(Promise.all(resolveAllUsers)).map(all => {
  //           console.log(all);
  //           return { rankings: all };
  //         });
  //                 // .then(rankings => rankings
  //                 //     .sort((a, b) => {
  //                 //       let problemsSolvedA = a.problemsSolved;
  //                 //       return 1;
  //                 //     })));
  //       });
  // }

  getCompetitionScoreboard(competitionId: string): Observable<CompetitionScoreboard> {
    return this.af.database.object(`/competitionScoreboards/${competitionId}`)
        .map(snapshot => {
          if (snapshot.$value === null) {
            return { rankings: [] };
          }
          let rankings: CompetitionScoreboardRanking[] = [];
          for (let uid in snapshot) {
            if (uid !== '$key' && snapshot.hasOwnProperty(uid)) {
              let info = snapshot[uid];
              rankings.push({
                uid: uid,
                problemsSolved: info.problemsSolved,
                timeScore: info.timeScore
              });
            }
          }
          // Sort descending by num problems solved, then ascending by timescore in case of tie
          rankings.sort((a, b) =>
              a.problemsSolved === b.problemsSolved
                // timescore ascending in case of tie
                ? a.timeScore - b.timeScore
                // primarily problems solved descending
                : b.problemsSolved - a.problemsSolved);
          return { rankings };
        });
  }

  updateUser(user: User, picture?: File): Promise<void> {
    let uid = user.$key;
    // Firebase does not allow $key to be present when updating
    delete user.$key;
    let pictureUpdate = picture
        ? this.storeImage(`profile-pictures/${uid}`, picture)
        : Promise.resolve(null);
    return pictureUpdate.then(url => {
      if (url) {
        user.imgUrl = url;
      }
      return this.af.database.object(`/users/${uid}`).set(user);
    });
  }

  /**
   * Promise resolves with the url of the image.
   */
  storeImage(path: string, image: Blob): Promise<string> {
    let storageRef = firebase.storage().ref(path);
    return new Promise(resolve => {
      let uploadTask = storageRef.put(image);
      // First two nulls are onProgress and onError, respectively. Last one is onComplete.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, x => console.log(x), err => console.log(err),
          () => storageRef.getDownloadURL().then(
            url => resolve(url),
            err => console.log(err)));
    });
  }

  /**
   * Returns the key of the newly created problem.
   */
  createProblem(problem: Problem, testCases: TestCase[]): string {
    problem.lastUpdated = new Date();
    // TODO: error handling
    // Push the new problem and save the key
    let key = this.af.database.list(`/problems`).push(problem).key;
    // Set the tests for the new problem
    this.af.database.object(`/tests/${key}`).set(testCases);
    return key;
  }

  updateProblem(problem: Problem, testCases: TestCase[]): Promise<void> {
    problem.lastUpdated = new Date();
    let problemId = problem.$key;

    // Firebase does not allow the $key property to be present
    // TODO: this is a reference, so the $key in problem and testCases are still deleted
    let problemAny: any = problem;
    delete problemAny.$key;
    let testCasesAny: any = testCases;
    delete testCasesAny.$key;

    let updateProblem = this.af.database.object(`/problems/${problemId}`).update(problemAny);
    let updateTests = this.af.database.object(`/tests/${problemId}`).set(testCasesAny);
    // Wait for both and map any[] to void
    return Promise.all([updateProblem, updateTests]).then(
        values => Promise.resolve());
  }

  deleteProblem(problemId: string): Promise<void> {
    // Delete the problem
    let removeProblem = this.af.database.object(`/problems/${problemId}`).remove();
    // Delete the testCases
    let removeTests = this.af.database.object(`/tests/${problemId}`).remove();
    // Wait for both and map any[] to void
    return Promise.all([removeProblem, removeTests]).then(
        values => Promise.resolve());
  }

  getLeaderboard(problemId: string): Observable<SuccessfulSubmission[]> {
    return this.af.database.list(`/successfulSubmissions/${problemId}`, {
      query: {
        orderByChild: 'execTime',
        limitToLast: 10
      }
    });
  }
}
