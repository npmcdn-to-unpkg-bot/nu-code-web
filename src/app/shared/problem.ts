import { User } from './';

export class Problem {
  $key: string;
  creatorUid: string;
  description: string;
  difficulty: Difficulty;
  feedback: Feedback;
  lastUpdated: Date;
  name: string;
  timeout: number;

  static fromJson(json: any): Problem {
    let problem: Problem = {
      $key: json.$key,
      // TODO: can I get the User object?
      creatorUid: json.creatorUid,
      description: json.description,
      difficulty: json.difficulty,
      feedback: json.feedback,
      lastUpdated: new Date(json.lastUpdated),
      name: json.name,
      timeout: json.timeout
    };
    return problem;
  }
}

type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard';

type Feedback = 'Simple' | 'Revealing';
