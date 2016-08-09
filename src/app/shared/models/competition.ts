import { Feedback } from './feedback';

export interface Competition {
  $key?: string;
  name: string;
  rounds: Round[];
  creatorUid: string;
}

export class Competition implements Competition {
  constructor(
      name = '',
      rounds = [new Round()],
      creatorUid: string = null) {
    this.name = name;
    this.rounds = rounds;
    this.creatorUid = creatorUid;
  }
}

export interface Round {
  $key?: string;
  problems: CompetitionProblem[];
  startTime: Date;
  endTime: Date;
}

export class Round implements Round {
  constructor(
      problems = [new CompetitionProblem()],
      startTime = new Date(),
      endTime = new Date()) {
    this.problems = problems;
    this.startTime = startTime;
    this.endTime = endTime;
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
