import { Component } from '@angular/core';
import { TfsService } from '../../services/tfs.service';

@Component({
  selector: 'app-bug-tag-report',
  templateUrl: './bug-tag-report.component.html',
  styleUrls: ['./bug-tag-report.component.css']
})
export class BugTagReportComponent {
  tag: string;

  constructor(
    private tfs: TfsService) { }

  onSubmit() {
    const args = {
      tag: this.tag
    };

    this.tfs.getBugsTagReport(args).subscribe();
  }
}
