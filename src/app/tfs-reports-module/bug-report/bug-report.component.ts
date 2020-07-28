import { Component, OnInit } from '@angular/core';
import { TfsService } from '../../services/tfs.service';

@Component({
  selector: 'app-bug-report',
  templateUrl: './bug-report.component.html',
  styleUrls: ['./bug-report.component.css']
})
export class BugReportComponent implements OnInit {
  fromDate: Date = new Date();
  toDate: Date = new Date();
  projects: ({ viewValue: string, value: string })[];
  project: string;

  constructor(
    private tfs: TfsService,
  ) { }

  ngOnInit(): void {
    this.fromDate.setDate(this.fromDate.getDate() - 1);
    this.project = 'captor';
    this.projects = [
      { viewValue: 'APR', value: 'apr' },
      { viewValue: 'CAPTOR', value: 'captor' },
      { viewValue: 'DOC', value: 'doc' },
      { viewValue: 'DOC0', value: 'doc' },
      { viewValue: 'DocInfo', value: 'docinfo' },
      { viewValue: 'IDVS', value: 'idvs' },
      { viewValue: 'InmateAssignment', value: 'inmateassignment' },
      { viewValue: 'IOCMS', value: 'iocms' },
      { viewValue: 'OnBase', value: 'onbase' },
      { viewValue: 'Parole', value: 'parole' },
      { viewValue: 'PBPP', value: 'pbpp' },
      { viewValue: 'SharePoint', value: 'sharepoint' },
      { viewValue: 'WorkOrder', value: 'workorder' }
    ];
  }

  onSubmit() {
    const args = {
      from: this.fromDate.toISOString(),
      to: this.toDate.toISOString(),
      project: this.project,
    };
    this.tfs.getBugsReport(args).subscribe();
  }
}
