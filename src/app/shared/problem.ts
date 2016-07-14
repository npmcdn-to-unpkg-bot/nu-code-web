import { Difficulty, User } from './';

export class Problem {
  name: string;
  description: string;
  lastUpdated: string;
  creator: User;
  difficulty: Difficulty
}
