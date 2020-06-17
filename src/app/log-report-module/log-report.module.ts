import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogReportRoutingModule } from './log-report.routing.module'
import { MostFrequentDetailsDialogComponent } from './most-frequent-details-dialog/most-frequent-details-dialog.component';
import { ExceptionSearchComponent } from './exception-search/exception-search.component';
import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { MostFrequentExceptionsComponent } from './most-frequent-exceptions/most-frequent-exceptions.component';
import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';

//TODO: clean up components never used 
//import { LiveErrorLogsComponent } from './live-error-logs/live-error-logs.component';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
  entryComponents: [MostFrequentDetailsDialogComponent],
  declarations: [
    MostFrequentExceptionsComponent,
    MostFrequentDetailsDialogComponent,
    ExceptionSearchComponent,
    MostFrequentErrorsDashbComponent,
    LogDashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatTabsModule,
    LogReportRoutingModule
  ],
})
export class LogReportModule {
}
