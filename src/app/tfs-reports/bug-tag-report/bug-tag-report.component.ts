import { Component, OnInit } from '@angular/core';
import { TfsReportService } from '../tfs-report-service.';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bug-tag-report',
  templateUrl: './bug-tag-report.component.html',
  styleUrls: ['./bug-tag-report.component.css']
})
export class BugTagReportComponent implements OnInit {

  tag: string;
  constructor(private tfsReportService: TfsReportService, private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {


    this.tfsReportService.apiBugsTagReport(this.tag)
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
