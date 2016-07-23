/*
 * Based off the md-input component from material2
 * https://github.com/angular/material2/blob/master/src/components/input/input.ts
 */

import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Output,
  NgZone,
  Provider,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  DefaultValueAccessor,
  NgModel,
} from '@angular/forms';
import { fromTextArea, Editor, EditorConfiguration } from 'codemirror';
import { LanguageDropdownComponent } from './language-dropdown';

const noop = () => {};

const CM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true
};

const CharacterLimit = 10000;

@Component({
  moduleId: module.id,
  selector: 'app-code-editor',
  templateUrl: 'code-editor.component.html',
  styleUrls: [
    // TODO: find out how this can be restricted here only (also change encapsulation)
    // '/vendor/codemirror/lib/codemirror.css',
    'code-editor.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [CM_INPUT_CONTROL_VALUE_ACCESSOR],
  directives: [
    DefaultValueAccessor,
    NgModel,
    LanguageDropdownComponent
  ]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('textarea') textarea: ElementRef;
  private editor: Editor;

  langId: string;
  get sourceCode(): string { return this.editor.getValue(); };
  @Input() set sourceCode(v: string) {
    if (v !== this.sourceCode) {
      this.editor.setValue(v);
      this.onChange(v);
    }
  }

  ngOnInit() {
    let startingMode = 'text/x-csrc';
    let options: EditorConfiguration = {
      lineNumbers: true,
      lineWrapping: true,
      mode: 'text/x-csrc'
    };
    this.editor = fromTextArea(this.textarea.nativeElement, options);
    // this.editor.on('change', (editor, change) => this.onChange(change.text));
    // this.editor.on('change', (editor) => this.onChange(editor.getValue()));
  }

  onLangChange(langId: string): void {
    this.langId = langId;
    // this.editor.setOption('mode', langId);
  }

  private charCountDisplay() {
    return `${this.sourceCode.length}/${CharacterLimit}`;
  };

  numChars() {
    return this.editor.getValue().length;
  }

  useSublimeKeyBindings(): void {
    this.editor.setOption('keyMap', 'sublime');
  }

  useVimKeyBindings(): void {
    this.editor.setOption('keyMap', 'vim');
  }

  useEmacsKeyBindings(): void {
    this.editor.setOption('keyMap', 'emacs');
  }

  writeValue(value: any) {
    if (value) {
      this.sourceCode = value;
    }
  }

  onChange: (v) => void = noop;
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  onTouched: (_: any) => void = noop;
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
}
