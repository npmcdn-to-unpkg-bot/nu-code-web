import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { fromTextArea } from 'codemirror';

@Component({
  moduleId: module.id,
  selector: 'app-code-mirror',
  templateUrl: 'code-mirror.component.html',
  styleUrls: [
    // TODO: find out how this can be restricted here only (also change encapsulation)
    // '/vendor/codemirror/lib/codemirror.css',
    'code-mirror.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class CodeMirrorComponent implements OnInit { //, OnChanges {
  @ViewChild('textarea') textarea: ElementRef;

  @Input() sourceCode: string = '';

  constructor() { }

  ngOnInit() {
    // let elem = this.textarea.nativeElement;
    // console.log(elem);
    fromTextArea(this.textarea.nativeElement, {
          lineNumbers: true,
          lineWrapping: true
        });
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   let currentValue = changes['sourceCode'].currentValue
  //   console.log(currentValue);
  // }

  // writeValue(value: string) {
  //   this.sourceCode = value;
  // }

  // onChange = (event) => {};
  // onTouched = () => {};
  // registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }
  // registerOnTouched(fn: () => void): void { this.onTouched = fn; }

}
