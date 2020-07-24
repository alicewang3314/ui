import { Component, OnInit } from '@angular/core';
import { TfsReportService } from '../../services/tfs-report-service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private tfsReportService: TfsReportService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.fromDate.setDate(this.fromDate.getDate() - 1);
    this.project = "captor";
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
  }

  onSubmit() {
    this.tfsReportService.apiBugsReport(this.fromDate, this.toDate, this.project, "")
      .subscribe(resp => {
        if (!resp) {
          this.matSnackBar.open("No Data", null, { duration: 3000, horizontalPosition: 'left' })
        }
        else{
          this.matSnackBar.open("Report downloaded", null, { duration: 3000, horizontalPosition: 'left' })
          this.tfsReportService.downloadFile(resp);
        }
      },
        error => {
          this.matSnackBar.open("Error: Please check input", null, { duration: 5000, horizontalPosition: 'left' })
        });
  }
}
