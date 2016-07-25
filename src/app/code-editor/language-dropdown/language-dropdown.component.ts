/*
 * Based on MdInput from angular/material2
 * https://github.com/angular/material2/tree/master/src/components/input
 */

import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SupportedLanguagesByCode, SupportedLanguagesByDisplay } from '../shared';

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
  // Registed by ngModel
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  private langChoices: string[] = Object.keys(SupportedLanguagesByDisplay);

  private _langDisplay: string;
  private _langCode: string;

  public get langDisplay(): string {
    return this._langDisplay;
  }
  public set langDisplay(newLangDisplay: string) {
    if (this._langDisplay !== newLangDisplay) {
      this._langDisplay = newLangDisplay;
      this._langCode = SupportedLanguagesByDisplay[newLangDisplay];
      this.onChangeCallback(this._langCode);
    }
  }

  public get langCode(): string {
    return this._langCode;
  }
  @Input() public set langCode(newLangCode: string) {
    if (this._langCode !== newLangCode) {
      this._langCode = newLangCode;
      this._langDisplay = SupportedLanguagesByCode[this._langCode];
      this.onChangeCallback(newLangCode);
    }
  }

  // Called on init and user click
  selected(choice: string) {
    this.langDisplay = choice;
  }

  writeValue(langCode: string) {
    this._langCode = langCode;
    this._langDisplay = SupportedLanguagesByCode[langCode];
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
