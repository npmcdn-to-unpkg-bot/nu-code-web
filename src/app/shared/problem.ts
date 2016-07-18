import { Difficulty, User } from './';

export class Problem {
  name: string;
  description: string;
  lastUpdated: string;
  creator: User;
  difficulty: Difficulty;
  timeout: number;

  getId = (): string => {
    return this.name.replace(/[^\s\w\d]/g, '');
  };

  toString(): string {
    return this.name + "";
  }
}
