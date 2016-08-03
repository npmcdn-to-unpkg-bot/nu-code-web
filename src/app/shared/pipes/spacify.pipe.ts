import { Pipe, PipeTransform } from '@angular/core';

/**
 * Turns a "camelCase" or "PascalCase" string into a "Camel Case" or "Pascal Case" string
 */
@Pipe({
  name: 'spacify'
})
export class SpacifyPipe implements PipeTransform {

  transform(value: string): string {
    return value
        // Insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // Uppercase the first character
        .replace(/^./, char => char.toUpperCase())
        .trim();
  }

}
