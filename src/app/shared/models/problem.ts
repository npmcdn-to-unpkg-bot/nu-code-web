export interface Problem {
  $key?: string;
  creatorUid: string;
  description: string;
  difficulty: Difficulty;
  lastUpdated: Date;
  name: string;
  showErrors: boolean;
  timeout: number;
}

export class Problem implements Problem {
  constructor(
      name = '',
      description = '',
      difficulty: Difficulty = 'Easy',
      creatorUid = null,
      lastUpdated = null,
      showErrors = true,
      timeout = 3) {
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
    this.creatorUid = creatorUid;
    this.lastUpdated = lastUpdated;
    this.showErrors = showErrors;
    this.timeout = timeout;
  }
}

type Difficulty = 'Beginner' | 'Easy' | 'Medium' | 'Hard';
