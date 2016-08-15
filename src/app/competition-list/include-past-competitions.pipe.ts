import { Pipe, PipeTransform } from '@angular/core';
import { Competition } from '../shared';

@Pipe({
  name: 'includePast'
})
export class IncludePastCompetitionsPipe implements PipeTransform {
  transform(value: Competition[], include = false): any {
    let now = new Date();
    return !value || include
      ? value
      : value.filter(competition => now < competition.endTime);
  }
}
