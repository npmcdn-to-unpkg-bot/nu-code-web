/*
 * Based on MdInput from angular/material2
 * https://github.com/angular/material2/tree/master/src/components/input
 */

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SupportedLanguages, Language } from '../../shared';

const noop = () => {};

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => LanguageDropdownComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'app-language-dropdown',
  templateUrl: 'language-dropdown.component.html',
  styleUrls: ['language-dropdown.component.css'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class LanguageDropdownComponent implements ControlValueAccessor {
  supportedLanguages = SupportedLanguages;

  currentLanguage: Language = {
    name: 'C',
    editorMode: 'x-csrc',
    apiCode: 'c'
  };

  selected(choice: Language) {
    this.currentLanguage = choice;
    this.onChangeCallback(this.currentLanguage);
  }

  writeValue(language: Language) {
    this.currentLanguage = language;
  }

  // Registed by ngModel
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
