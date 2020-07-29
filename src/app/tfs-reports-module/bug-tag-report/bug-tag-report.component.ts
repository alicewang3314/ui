import { Component } from '@angular/core';
import { TfsService, MessageService } from '../../services';

@Component({
  selector: 'app-bug-tag-report',
  templateUrl: './bug-tag-report.component.html',
  styleUrls: ['./bug-tag-report.component.css']
})
export class BugTagReportComponent {
  tag: string;

  constructor(
    private tfs: TfsService,
    private message: MessageService) { }

  onSubmit() {
    const args = {
      tag: this.tag
    };

    this.tfs.getBugsTagReport(args).subscribe(
      null,
      () => this.message.message('Error. Please check your input.')
    );
  }
}
