/*
 * Modified from TimeSpan.js by Michael Stum
 * https://github.com/mstum/TimeSpan.js
 * Thanks for making this available. Copyright below.
 *
 * JavaScript TimeSpan Library
 *
 * Copyright (c) 2010 Michael Stum, http://www.Stum.de/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const millisecondsPerSecond = 1000;
const millisecondsPerMinute = 60000;
const millisecondsPerHour = 3600000;
const millisecondsPerDay = 86400000;

export class TimeSpan {
  private ms = 0;

  get totalMilliseconds() {
    return this.ms;
  }
  get totalSeconds() {
    return Math.floor(this.ms / millisecondsPerSecond);
  }
  get totalMinutes() {
    return Math.floor(this.ms / millisecondsPerMinute);
  }
  get totalHours() {
    return Math.floor(this.ms / millisecondsPerHour);
  }
  get totalDays() {
    return Math.floor(this.ms / millisecondsPerDay);
  }

  get milliseconds() {
    return this.ms % 1000;
  }
  get seconds() {
    return Math.floor(this.ms / millisecondsPerSecond) % 60;
  }
  get minutes() {
    return Math.floor(this.ms / millisecondsPerMinute) % 60;
  }
  get hours() {
    return Math.floor(this.ms / millisecondsPerHour) % 24;
  }
  get days() {
    return Math.floor(this.ms / millisecondsPerDay);
  }

  constructor(milliseconds = 0, seconds = 0, minutes = 0, hours = 0, days = 0) {
    this.ms = 0
      + (days * millisecondsPerDay)
      + (hours * millisecondsPerHour)
      + (minutes * millisecondsPerMinute)
      + (seconds * millisecondsPerSecond)
      + milliseconds;
  }

  static fromSeconds(seconds: number) {
    return new TimeSpan(0, seconds, 0, 0, 0);
  }
  static fromMinutes(minutes: number) {
    return new TimeSpan(0, 0, minutes, 0, 0);
  }
  static fromHours(hours: number) {
    return new TimeSpan(0, 0, 0, hours, 0);
  }
  static fromDays(days: number) {
    return new TimeSpan(0, 0, 0, 0, days);
  }
  static since(date: Date) {
    return TimeSpan.fromDates(date, new Date());
  }
  static until(date: Date) {
    return TimeSpan.fromDates(new Date(), date);
  }
  static fromDates(a: Date, b: Date, absolute = false) {
    let diffMilliseconds = b.valueOf() - a.valueOf();
    if (absolute) {
      diffMilliseconds = Math.abs(diffMilliseconds);
    }
    return new TimeSpan(diffMilliseconds, 0, 0, 0, 0);
  }

  addMilliseconds(milliseconds: number) {
    this.ms += milliseconds;
  }
  addSeconds(seconds: number) {
    this.ms += (seconds * millisecondsPerSecond);
  }
  addMinutes(minutes: number) {
    this.ms += (minutes * millisecondsPerMinute);
  }
  addHours(hours: number) {
    this.ms += (hours * millisecondsPerHour);
  }
  addDays(days: number) {
    this.ms += (days * millisecondsPerDay);
  }

  subtractMilliseconds(milliseconds: number) {
    this.ms -= milliseconds;
  }
  subtractSeconds(seconds: number) {
    this.ms -= (seconds * millisecondsPerSecond);
  }
  subtractMinutes(minutes: number) {
    this.ms -= (minutes * millisecondsPerMinute);
  }
  subtractHours(hours: number) {
    this.ms -= (hours * millisecondsPerHour);
  }
  subtractDays(days: number) {
    this.ms -= (days * millisecondsPerDay);
  }

  add(other: TimeSpan) {
    this.ms += other.ms;
  }
  subtract(other: TimeSpan) {
    this.ms -= other.ms;
  }
  equals(other: TimeSpan) {
    return this.ms === other.ms;
  }
}
