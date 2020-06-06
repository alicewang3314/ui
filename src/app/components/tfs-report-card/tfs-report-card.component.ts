import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'tfs-report-card',
  templateUrl: './tfs-report-card.component.html',
  styleUrls: ['./tfs-report-card.component.css'],
})
export class TFSReportCard {
  private _team: any;
  private _name: string;

  @Input()
  set team(val: any) {
    console.log(val);
    this._team = val;
  }

  get team(): any {
    return this._team;
  }

  @Input()
  set name(val: string) {
    console.log(val);
    this._name = val;
  }

  get isValidReport(): boolean {
    return this._name === 'all' ?
      !!this.team.currentTasks :
      this.team.currentTasks && this.team.iteration
  }

  constructor(private router: Router) {
  }

  getReport(title: string) {
    this.router.navigate(["/dashboard/project", title], {
      queryParams: { current: 1 }
    });
  }
}