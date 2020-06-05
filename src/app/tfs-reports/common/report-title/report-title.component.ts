import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-title',
  templateUrl: './report-title.component.html',
  styleUrls: ['./report-title.component.css']
})
export class ReportTitleComponent implements OnInit {

  constructor() { }
  @Input() title: string;
  @Input() description: string;

  ngOnInit(): void {
  }

}
