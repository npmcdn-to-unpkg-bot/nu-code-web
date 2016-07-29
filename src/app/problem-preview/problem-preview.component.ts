import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from '../shared';

@Component({
  moduleId: module.id,
  selector: 'app-problem-preview',
  templateUrl: 'problem-preview.component.html',
  styleUrls: ['problem-preview.component.css']
})
export class ProblemPreviewComponent implements OnInit {
  @Input() problem: Problem;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  openProblemPage() {
    this.router.navigate(['/problems', this.problem.$key]);
  }

}
