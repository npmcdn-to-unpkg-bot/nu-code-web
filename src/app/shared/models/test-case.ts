export interface TestCase {
  input: string;
  output: string;
  hint?: string;
}

export class TestCase implements TestCase {
  constructor(
      input = '',
      output = '') {
    this.input = input;
    this.output = output;
  }
}
