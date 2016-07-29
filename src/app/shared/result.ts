export interface Result {
  status: Status;
  // If status === 'Pass'
  execTime?: number;
  // If status === 'Fail' and one of the failed tests had a hint
  hints?: string[]
  // If status === 'CompilationError' | 'RuntimeError'
  message?: string;
}

type Status = 'Pass' | 'Fail' | 'Timeout' | 'CompilationError' | 'RuntimeError';
