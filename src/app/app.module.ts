import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { FilterPipe } from "src/app/pipes";
import { AppComponent } from "./app.component";
import { LogReportModule } from "././log-report/log-report.module";
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TfsDashboardComponent } from "./tfs-dashboard/tfs-dashboard.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { ResourceStatisticsComponent } from "./resource-statistics/resource-statistics.component";
import { ProjectResourceComponent } from "./project-resource/project-resource.component";
import { HomePageComponent, } from "./home-page/home-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//import { IndexPageComponent } from "./index-page/index-page.component";
import { InterceptorService } from './interceptor.service';
import { TfsDashboardHomeComponent } from './tfs-dashboard-home/tfs-dashboard-home.component';
import { TfsDashboardSettingsComponent } from './settings/tfs-dashboard-settings/tfs-dashboard-settings.component';
import { LogDashboardComponent } from './log-report/log-dashboard/log-dashboard.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { LogDashboardComponent } from './log-dashboard/log-dashboard.component';
// TODO: Refactoring cleanup
import { BugReportCard, BugDetailsDialog, LoaderComponent, TFSReportCard } from './components';
import { TfsReportsModule } from './tfs-reports/tfs-reports.module';

@NgModule({
  declarations: [
    AppComponent,
    TfsDashboardComponent,
    ProjectDetailsComponent,
    ResourceStatisticsComponent,
    ProjectResourceComponent,
    HomePageComponent,
    //IndexPageComponent,
    LoaderComponent,
    FilterPipe,
    TfsDashboardHomeComponent,
    TfsDashboardSettingsComponent,
    //TODO: refactoring clean up
    LogDashboardComponent,
    BugDetailsDialog,
    BugReportCard,
    TFSReportCard,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    MatSidenavModule,
    MatIconModule,
    MatSlideToggleModule,
    NgxChartsModule,
    LogReportModule,
    TfsReportsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule
  ],
  // entryComponents: [
  //   BugDetailsDialog
  // ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
