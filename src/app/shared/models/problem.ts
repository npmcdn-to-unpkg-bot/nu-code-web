import { Feedback } from './feedback';

export interface Problem {
  $key?: string;
  creatorUid: string;
  description: string;
  difficulty: Difficulty;
  feedback: Feedback;
  lastUpdated: Date;
  name: string;
  timeout: number;
}

export class Problem implements Problem {
  constructor(
      name = '',
      description = '',
      feedback: Feedback = 'Simple',
      difficulty: Difficulty = 'Easy',
      creatorUid = null,
      lastUpdated = null,
      timeout = 3) {
    this.name = name;
    this.description = description;
    this.feedback = feedback;
    this.difficulty = difficulty;
    this.creatorUid = creatorUid;
    this.lastUpdated = lastUpdated;
    this.timeout = timeout;
  }
}

type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard';
