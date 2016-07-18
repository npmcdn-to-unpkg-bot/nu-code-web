import { Component, OnInit } from '@angular/core';
import { SupportedLanguages } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-language-dropdown',
  templateUrl: 'language-dropdown.component.html',
  styleUrls: ['language-dropdown.component.css']
})
export class LanguageDropdownComponent implements OnInit {
  supportedLanguages = SupportedLanguages;
  selectedChoice: string = SupportedLanguages[0].name;

  constructor() {}

  ngOnInit() {
  }

  selected(choice: string) {
    this.selectedChoice = choice;
    console.log(choice);
  }

}
