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

type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard';

type Feedback = 'Simple' | 'Revealing';
