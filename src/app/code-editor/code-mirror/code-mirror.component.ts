import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Language } from '../../shared';

import { fromTextArea, Editor, EditorConfiguration } from 'codemirror';
// TODO: lazy load
import 'codemirror/addon/mode/simple';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/go/go';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/rust/rust';

const noop = () => {};

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CodeMirrorComponent),
  multi: true
};

@Component({
  moduleId: module.id,
  selector: 'app-code-mirror',
  templateUrl: 'code-mirror.component.html',
  styleUrls: [
    // TODO: find out how this can be restricted here only (also change encapsulation)
    // '/vendor/codemirror/lib/codemirror.css',
    'code-mirror.component.css'
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class CodeMirrorComponent implements OnInit, ControlValueAccessor {
  @ViewChild('textarea') textarea: ElementRef;
  editor: Editor;

  @Input() autofocus: boolean = false;

  @Input() set mode(mode: string) {
    if (this.editor) {
      this.editor.setOption('mode', mode);
    }
  }

  constructor() { }

  ngOnInit() {
    let config: EditorConfiguration = {
      autofocus: this.autofocus,
      indentWithTabs: false,
      tabSize: 2,
      lineNumbers: true,
      lineWrapping: true
    };
    this.editor = fromTextArea(this.textarea.nativeElement, config);
    this.editor.on('change', editor => {
      this.onChangeCallback(editor.getValue());
      this.onTouchedCallback();
    });
  }

  // ngModel changes on us
  writeValue(value: string) {
    if (this.editor) {
      this.editor.setValue(value || '');
    }
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
