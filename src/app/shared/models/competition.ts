import { Feedback } from './feedback';

export interface Competition {
  $key?: string;
  name: string;
  problems: CompetitionProblem[];
  startTime: Date;
  endTime: Date;
  creatorUid: string;
}

export class Competition implements Competition {
  constructor(
      name = '',
      problems = [new CompetitionProblem()],
      startTime = new Date(),
      endTime = new Date(),
      creatorUid: string = null) {
    this.name = name;
    this.problems = problems;
    this.startTime = startTime;
    this.endTime = endTime;
    this.creatorUid = creatorUid;
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
}
