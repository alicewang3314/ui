import { Component } from '@angular/core';
import { faFileExcel, faBug, faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'export-reports',
  templateUrl: './export-reports.component.html',
  styleUrls: ['./export-reports.component.css']
})
export class ExportReportsComponent {
  changesetIcon = faFileExcel;
  bugIcon = faBug;
  bugTagIcon = faTag;
}