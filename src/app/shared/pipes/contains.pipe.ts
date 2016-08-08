import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../';

@Pipe({
  name: 'contains'
})
export class ContainsPipe implements PipeTransform {
  transform(allProblems: Problem[], query: string): Problem[] {
    return allProblems
        ? allProblems.filter(problem => {
            let nameMatches = containsIgnoreCase(problem.name, query);
            return nameMatches;
          })
        : null;
  }
}

function containsIgnoreCase(bigString: string, lilString: string): boolean {
  return bigString.toLowerCase().includes(lilString.toLowerCase());
}
