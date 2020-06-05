import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tfs-report-card',
  templateUrl: './tfs-report-card.component.html',
  styleUrls: ['./tfs-report-card.component.css']
})
export class TFSReportCard {
  @Input() team: any;

  constructor(private router: Router) { }

  getReport(title: string) {
    this.router.navigate(["/dashboard/project", title], {
      queryParams: { current: 1 }
    });
  }
}