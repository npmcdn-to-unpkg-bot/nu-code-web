import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precision'
})
export class PrecisionPipe implements PipeTransform {

  transform(value: number, desiredPrecision: number): string {
    return value.toPrecision(desiredPrecision);
  }

}
