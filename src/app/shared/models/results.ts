type Status = 'Pass' | 'Fail' | 'Timeout' | 'CompilationError' | 'RuntimeError';

export interface Result {
  status: Status;
  // If status === 'Pass'
  execTime?: number;
  // If status === 'Fail' and one of the failed tests had a hint
  hints?: string[];
  // If status === 'CompilationError' | 'RuntimeError'
  // If status === 'Fail' and one of the failed tests had a hint
  message?: string;
}

/**
 * Used in "my submissions"
 */
export interface MySubmission {
  status: Status;
  lang: string;
  submittedOn: number;
  execTime?: number;
}

/**
 * Used in the "leaderboard"
 */
export interface SuccessfulSubmission {
  execTime: number;
  lang: string;
  submitterUid: string;
  submittedOn: number;
}
