import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ansiToHtml'
})
export class AnsiToHtmlPipe implements PipeTransform {

  transform(ansi: string): string {
    return ansi
        // Replace tabs with 4 spaces
        .replace(/\t/g, '    ')
        // Replace newline with <br>
        .replace(/\r*\n/g, '<br>');
  }

}
