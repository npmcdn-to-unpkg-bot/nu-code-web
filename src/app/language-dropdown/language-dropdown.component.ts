import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SupportedLanguages } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-language-dropdown',
  templateUrl: 'language-dropdown.component.html',
  styleUrls: ['language-dropdown.component.css']
})
export class LanguageDropdownComponent implements OnInit {
  @Output() langChange = new EventEmitter();

  langChoices: string[];
  selectedChoice: string;

  constructor() {
    this.langChoices = Object.keys(SupportedLanguages);
  }

  ngOnInit() {
    this.selected(this.langChoices[0]);
  }

  selected(choice: string) {
    this.selectedChoice = choice;
    this.langChange.emit(SupportedLanguages[this.selectedChoice]);
  }
}
