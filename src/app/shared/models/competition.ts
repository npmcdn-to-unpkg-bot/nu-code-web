import { Feedback } from './feedback';

export interface Competition {
  $key?: string;
  name: string;
  // Array of problem ids
  problems: string[];
  startTime: Date;
  endTime: Date;
  creatorUid: string;
}

export class Competition implements Competition {
  constructor(
      name = '',
      problems = [],
      startTime = new Date(),
      endTime = new Date(),
      creatorUid: string = null) {
    this.name = name;
    this.problems = problems;
    this.startTime = startTime;
    this.endTime = endTime;
    this.creatorUid = creatorUid;
  }

  static fromSnapshot(snapshot: any): Competition {
    return {
      $key: snapshot.$key,
      name: snapshot.name,
      startTime: new Date(snapshot.startTime),
      endTime: new Date(snapshot.endTime),
      creatorUid: snapshot.creatorUid,
      problems: snapshot.problems
    };
  }
}

export interface CompetitionProblem {
  $key?: string;
  name: string;
  description: string;
  feedback: Feedback;
  timeout: number;
  penalty: number;
}

export class CompetitionProblem implements CompetitionProblem {
  constructor(
      name = '',
      description = '',
      feedback: Feedback = 'Simple',
      timeout = 3,
      penalty = 0) {
    this.name = name;
    this.description = description;
    this.feedback = feedback;
    this.timeout = timeout;
    this.penalty = penalty;
  }

  static fromSnapshot(snapshot: any): CompetitionProblem {
    return {
      $key: snapshot.$key,
      name: snapshot.name,
      description: snapshot.description,
      feedback: snapshot.feedback,
      timeout: snapshot.timeout,
      penalty: snapshot.penalty
    };
  }
}
