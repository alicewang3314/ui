import { Component, OnInit } from '@angular/core';
import { TfsReportService, FileResponse } from '../tfs-report-service.';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bug-changet-report',
  templateUrl: './bug-changet-report.component.html',
  styleUrls: ['./bug-changet-report.component.css']
})
export class BugChangetReportComponent implements OnInit {

  bugNos: string;
  constructor(private tfsReportService: TfsReportService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.tfsReportService.apiBugsChangesetsReportGet(this.bugNos)
      .subscribe(resp => {
        if (!resp) {
          this.matSnackBar.open("No Data", null, { duration: 3000, horizontalPosition: 'left' })
        }
        else {
          this.matSnackBar.open("Report downloaded", null, { duration: 3000, horizontalPosition: 'left' })
          this.tfsReportService.downloadFile(resp);
        }

      },
        error => {
          this.matSnackBar.open("Error: Please check input", null, { duration: 5000, horizontalPosition: 'left' })
        });
  }
}
