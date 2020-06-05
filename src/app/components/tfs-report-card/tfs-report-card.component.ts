import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tfs-report-card',
  templateUrl: './tfs-report-card.component.html',
  styleUrls: ['./tfs-report-card.component.css'],
})
export class TFSReportCard {
  data: any;

  @Input()
  set team(val: any) {
    console.log(val);
    this.data = val;
  }

  get team(): any {
    return this.data;
  }

  constructor(private router: Router) {
    // this.changeDetect.detectChanges()
  }

  getReport(title: string) {
    this.router.navigate(["/dashboard/project", title], {
      queryParams: { current: 1 }
    });
  }
}