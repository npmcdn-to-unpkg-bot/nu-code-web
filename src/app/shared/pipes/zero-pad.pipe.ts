import { Pipe, PipeTransform } from '@angular/core';
import { zeroPad } from '../models';

@Pipe({
  name: 'zeroPad'
})
export class ZeroPadPipe implements PipeTransform {
  /**
   * Adds enough zeros to match the specified number of digits.
   */
  transform(num: number, digits: number): string {
    return zeroPad(num, digits);
  }
}
