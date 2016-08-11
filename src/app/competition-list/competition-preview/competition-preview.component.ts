import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Competition } from '../../shared';

@Component({
  moduleId: module.id,
  selector: 'app-competition-preview',
  templateUrl: 'competition-preview.component.html',
  styleUrls: ['competition-preview.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class CompetitionPreviewComponent {
  @Input() competition: Competition;
}
