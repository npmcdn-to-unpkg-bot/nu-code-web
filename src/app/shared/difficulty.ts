export enum Difficulty {
  Beginner,
  Easy,
  Medium,
  Hard
}
export namespace Difficulty {
  export function fromString(difficulty: string): Difficulty {
    let value;
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        value = Difficulty.Beginner;
      case 'easy':
        value = Difficulty.Easy;
      case 'medium':
        value = Difficulty.Medium;
      case 'hard':
        value = Difficulty.Hard;
      default:
        value = null;
    }
    return value;
  }

  // export function toString(difficulty: Difficulty): string {
  //   let value;
  //   switch (difficulty) {
  //     case difficulty.:
  //       value = Difficulty.Beginner;
  //     case 'easy':
  //       value = Difficulty.Easy;
  //     case 'medium':
  //       value = Difficulty.Medium;
  //     case 'hard':
  //       value = Difficulty.Hard;
  //     default:
  //       value = null;
  //   }
  //   return value;
  // }
}
