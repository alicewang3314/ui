import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogReportRoutingModule } from './log-report.routing.module'
import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb/most-frequent-errors-dashb.component';
import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';

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
  declarations: [
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
export class LogReportModule { }
