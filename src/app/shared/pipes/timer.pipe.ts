import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '../models';

/**
 * Parameter `format` could be any substring of:
 * 'yy:MM:dd:hh:mm:ss:fff'
 */
@Pipe({
  name: 'timer'
})
export class TimerPipe implements PipeTransform {
  transform(value: Date | number | string, format: string): string {
    let date = toDate(value);
    let time = new Time(date.getTime());
    return time.toFormattedString(format);
  }
}

function toDate(value: Date | number | string): Date {
  let date: Date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'number') {
    let milliseconds = value as number;
    date = new Date(milliseconds);
  } else if (typeof value === 'string') {
    let isoString = value as string;
    date = new Date(isoString);
  }
  return date;
}
