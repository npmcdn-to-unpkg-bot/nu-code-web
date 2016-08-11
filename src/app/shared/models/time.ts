import { zeroPad } from './zero-pad';

const FormatString = 'dd:hh:mm:ss:fff';

export class Time implements Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;

  constructor(milliseconds: number) {
    this.days = Math.floor(milliseconds / 86400000);
    milliseconds -= this.days * 86400000;

    this.hours = Math.floor(milliseconds / 3600000);
    milliseconds -= this.hours * 3600000;

    this.minutes = Math.floor(milliseconds / 60000);
    milliseconds -= this.minutes * 60000;

    this.seconds = Math.floor(milliseconds / 1000);
    milliseconds -= this.seconds * 1000;

    this.milliseconds = milliseconds;
  }

  static betweenDates(a: Date, b: Date): Time {
    let millisecondsDiff = Math.abs(a.getTime() - b.getTime());
    return new Time(millisecondsDiff);
  }

  toString(): string {
    let days = zeroPad(this.days, 2);
    let hours = zeroPad(this.hours, 2);
    let minutes = zeroPad(this.minutes, 2);
    let seconds = zeroPad(this.seconds, 2);
    let milliseconds = zeroPad(this.milliseconds, 3);
    return `${days}:${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  toFormattedString(format: string): string {
    let start = FormatString.indexOf(format);
    let fullString = this.toString();
    let subString = fullString.substr(start, format.length);
    return subString;
  }
}
