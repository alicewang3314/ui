import { Component, OnInit } from '@angular/core';
import { LogDataServiceService } from '../../services/log-data-service.service';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exception-search',
  templateUrl: './exception-search.component.html',
  styleUrls: ['./exception-search.component.css']
})
export class ExceptionSearchComponent implements OnInit {
  dataSource: any = undefined;
  environment: string;
  application: string;
  fromDatePickerValue: Date = new Date();

  toDatePickerValue: Date = new Date();
  displayedColumns: string[] = [
    'correlationId',
    'time',
    'exceptionMessage',
    'stackTrace'
  ];
  pageEvent: PageEvent;
  pagLength: number;
  pageSize = 10;

  constructor(private logDataServiceService: LogDataServiceService) { }

  ngOnInit() {
    this.fromDatePickerValue.setDate(this.fromDatePickerValue.getDate() - 1);
  }

  search() {
    this.logDataServiceService.searchExceptions(this.environment, this.application, this.fromDatePickerValue.toLocaleDateString().replace(/[^ -~]/g, '')
      , this.toDatePickerValue.toLocaleDateString().replace(/[^ -~]/g, ''), this.pageSize, 1).subscribe(
        resp => {
          this.dataSource = resp.body['item2'];
          this.pagLength = parseInt(resp.headers.get('X-Paging-TotalRecordCount'));
        }
      );
  }

  onPagChange(event: PageEvent) {
    this.logDataServiceService.searchExceptions(this.environment, this.application, this.fromDatePickerValue.toLocaleDateString().replace(/[^ -~]/g, '')
      , this.toDatePickerValue.toLocaleDateString().replace(/[^ -~]/g, ''), event.pageSize, event.pageIndex + 1).subscribe(
        resp => {
          this.dataSource = resp.body['item2'];
          this.pagLength = parseInt(resp.headers.get('X-Paging-TotalRecordCount'));
        }
      );
  }
}
