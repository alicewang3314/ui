import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatSelectModule } from "@angular/material/select";
import { ChangesetReportComponent } from './changeset-report/changeset-report.component';
import { BugReportComponent } from './bug-report/bug-report.component';
import { BugChangetReportComponent } from './bug-changet-report/bug-changet-report.component';
import { BugTagReportComponent } from './bug-tag-report/bug-tag-report.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportTitleComponent } from './common/report-title/report-title.component';



@NgModule({
  declarations: [ ChangesetReportComponent, BugReportComponent, BugChangetReportComponent, BugTagReportComponent, ReportTitleComponent],
  imports: [    CommonModule,    
    BrowserModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatSelectModule    
  ],
  exports:[
    ReportTitleComponent
  ]
})
export class TfsReportsModule { }
