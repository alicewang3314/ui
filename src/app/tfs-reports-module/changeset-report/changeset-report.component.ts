import { Component, OnInit } from '@angular/core';
import { TfsReportService, FileResponse } from '../tfs-report-service.';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from '@angular/compiler/src/util';

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
  constructor(private tfsReportService: TfsReportService, private matSnackBar: MatSnackBar) { }

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
    //console.log('submit');

    // this.tfsReportService.getChangesetReport(this.fromDate, this.toDate, this.project, this.path)
    //   .subscribe(resp => {
    //     this.matSnackBar.open("Report downloaded", null, { duration: 3000, horizontalPosition: 'left' })
    //     this.downloadFile(resp.body)

    //   },
    //     error => {
    //       this.matSnackBar.open("Error: Please check input", null, { duration: 5000, horizontalPosition: 'left' })
    //     });

    this.tfsReportService.apiChangesetsReport(this.fromDate, this.toDate, this.project, this.path)
      .subscribe(resp => {
        this.matSnackBar.open("Report downloaded", null, { duration: 3000, horizontalPosition: 'left' })
        this.tfsReportService.downloadFile(resp);
      },
        error => {
          this.matSnackBar.open("Error: Please check input", null, { duration: 5000, horizontalPosition: 'left' })
        });
  }

  downloadFile(resp: any) {
    const blob = new Blob([resp], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, `Changesets-Report_${formatDate(new Date(), "MMddyy-hhmmss", "en-us")}.xlsx`);
      return;
    }

    // Create a link pointing to the ObjectURL containing the blob.
    const urlBlob = window.URL.createObjectURL(blob);

    var link = document.createElement('a');
    link.href = urlBlob;
    link.download = `Changesets-Report_${formatDate(new Date(), "MMddyy-hhmmss", "en-us")}.xlsx`;
    link.click();

  }

  // downloadFile2(resp: FileResponse) {
  //   const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //     window.navigator.msSaveOrOpenBlob(blob, resp.fileName);
  //     return;
  //   }

  //   // Create a link pointing to the ObjectURL containing the blob.
  //   const urlBlob = window.URL.createObjectURL(blob);

  //   var link = document.createElement('a');
  //   link.href = urlBlob;
  //   //link.download = `Changesets-Report_${formatDate(new Date(), "MMddyy-hhmmss", "en-us")}.xlsx`;
  //   link.download = resp.fileName;
  //   link.click();

  // }

}
