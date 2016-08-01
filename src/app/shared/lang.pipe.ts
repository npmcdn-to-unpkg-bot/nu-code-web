import { Pipe, PipeTransform } from '@angular/core';
import { SupportedLanguagesByCode } from './';

@Pipe({
  name: 'lang'
})
export class LangPipe implements PipeTransform {

  transform(code: string): string {
    return SupportedLanguagesByCode[code];
  }

}
