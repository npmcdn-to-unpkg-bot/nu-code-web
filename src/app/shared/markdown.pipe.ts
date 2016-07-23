import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from 'showdown';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {

  private converter = new Converter();

  /**
   * Converts Markdown to HTML using Showdown.js
   */
  transform(markdown: string, args?: any): string {
    return this.converter.makeHtml(markdown);
  }

}
