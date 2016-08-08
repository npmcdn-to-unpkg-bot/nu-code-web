import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../';

@Pipe({
  name: 'contains'
})
export class ContainsPipe implements PipeTransform {
  transform(allProblems: Problem[], query: string): Problem[] {
    return allProblems
        ? allProblems.filter(problem => {
            let nameMatches = matchesIgnoreCase(problem.name, query);
            return nameMatches;
          })
        : null;
  }
}

function matchesIgnoreCase(big: string, lil: string) {
  return fuzzySearch(big.toLowerCase(), lil.toLowerCase());
}

function fuzzySearch(big: string, lil: string) {
  let tlen = big.length;
  let qlen = lil.length;
  if (qlen > tlen) {
    return false;
  }
  if (qlen === tlen) {
    return lil === big;
  }
  outer: for (let i = 0, j = 0; i < qlen; i++) {
    let nch = lil.charCodeAt(i);
    while (j < tlen) {
      if (big.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}

