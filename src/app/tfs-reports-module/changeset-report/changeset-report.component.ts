import { Component, OnInit } from '@angular/core';
import { TfsService } from '../../services/tfs.service';

@Component({
  selector: 'app-changeset-report',
  templateUrl: './changeset-report.component.html',
  styleUrls: ['./changeset-report.component.css']
})
export class ChangesetReportComponent implements OnInit {

  fromDate: Date = new Date();
  toDate: Date = new Date();
  projects: ({ viewValue: string, value: string })[];
  project: string;
  path: string;

  constructor(
    private tfs: TfsService) { }

  ngOnInit() {
    this.fromDate.setDate(this.fromDate.getDate() - 1);

    this.projects = [
      { viewValue: "APR", value: "apr" },
      { viewValue: "CAPTOR", value: "captor" },
      { viewValue: "DOC", value: "doc" },
      { viewValue: "DOC0", value: "doc" },
      { viewValue: "DocInfo", value: "docinfo" },
      { viewValue: "IDVS", value: "idvs" },
      { viewValue: "InmateAssignment", value: "inmateassignment" },
      { viewValue: "IOCMS", value: "iocms" },
      { viewValue: "OnBase", value: "onbase" },
      { viewValue: "Parole", value: "parole" },
      { viewValue: "PBPP", value: "pbpp" },
      { viewValue: "SharePoint", value: "sharepoint" },
      { viewValue: "WorkOrder", value: "workorder" }
    ];

    this.project = "captor";
    this.path = "";
  }

  onSubmit() {
    const args = {
      from: this.fromDate.toISOString(),
      to: this.toDate.toISOString(),
      project: this.project,
      path: this.path,
    };

    this.tfs.getChangesetsReport(args).subscribe();
  }
}
