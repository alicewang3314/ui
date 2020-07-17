import { Component, OnInit } from '@angular/core';
import { LogDataServiceService } from '../services/log-data-service.service';
import { environment } from 'src/environments/environment';
import { MostFrequentDetailsDialogComponent } from '../most-frequent-details-dialog/most-frequent-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-most-frequent-exceptions',
  templateUrl: './most-frequent-exceptions.component.html',
  styleUrls: ['./most-frequent-exceptions.component.css']
})
export class MostFrequentExceptionsComponent implements OnInit {

  constructor(private logDataServiceService: LogDataServiceService
    , public dialog: MatDialog) { }

  data: any[];
  environment: string;
  application: string;

  ngOnInit() {
    this.data = [];
  }

  getMostFrequentLogs() {
    console.debug(this.environment + ", " + this.application);
    this.logDataServiceService.getMostFrequentLogs(this.environment, this.application)
      .subscribe(resp => {
        this.data = resp;
      });
  }

  openDialog(count, shortExceptionMessage, stackTrace): void {
    const dialogRef = this.dialog.open(MostFrequentDetailsDialogComponent, {
      width: 'auto',
      data: { count: count, shortException: shortExceptionMessage, stackTrace: stackTrace }
    });
  }
}
