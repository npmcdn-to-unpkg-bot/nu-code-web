export interface Result {
  status: Status;
  // Included if status === Status.Pass
  execTime?: number;
  // Included if status !== Status.Pass and the problem's feedback is 'Revealing'
  results?: [any]
  // Included if status === Status.Error
  message?: string;
}

type Status = 'Pass' | 'Fail' | 'Timeout' | 'CompilationError' | 'RuntimeError';
