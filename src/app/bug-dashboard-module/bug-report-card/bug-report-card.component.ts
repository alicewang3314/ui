import { Component, Input } from '@angular/core';
import { BugReportCard as PropType } from 'src/app/types';

@Component({
  selector: 'bug-card',
  templateUrl: './bug-report-card.component.html',
  styleUrls: ['./bug-report-card.component.css'],
})
export class BugReportCardComponent {
  @Input() data: PropType;
};