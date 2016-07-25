import { Component, ElementRef, forwardRef, Input, OnInit, Output, NgZone, Provider, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromTextArea, Editor, EditorConfiguration } from 'codemirror';
import { LanguageDropdownComponent } from './language-dropdown';
import { Submission } from '../shared';

const CharacterLimit = 10000;

const noop = () => {};

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeEditorComponent),
  multi: true
};

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
  directives: [LanguageDropdownComponent],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CodeEditorComponent implements OnInit, ControlValueAccessor {
  // Registed by ngModel
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  @Input() autofocus: boolean = false;
  @Input() submission: any = {};
  @ViewChild('textarea') textarea: ElementRef;
  private editor: Editor;

  ngOnInit() {
    // let startingMode = 'text/x-csrc';
    let options: EditorConfiguration = {
      autofocus: this.autofocus,
      lineNumbers: true,
      lineWrapping: true
    };
    this.editor = fromTextArea(this.textarea.nativeElement, options);
    this.editor.on('change', editor => {
      this.submission.src = editor.getValue();
      this.onChangeCallback(this.submission);
    });
  }

  onLangChange(newLang: string) {
    this.submission.lang = newLang;
    this.onChangeCallback(this.submission);
    // TODO: change editor language mode
  }

  private charCountDisplay() {
    return `${this.submission.src ? this.submission.src.length : 0}/${CharacterLimit}`;
  };

  // TODO: figure out why the first write is null
  firstWriteDone = false;
  writeValue(submission: any) {
    if (this.firstWriteDone) {
      this.submission = submission;
      this.editor.setValue(submission.src);
    } else {
      this.firstWriteDone = true;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }
}
