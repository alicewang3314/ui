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
    this._team = val;
  }

  @Input()
  set name(val: string) {
    this._name = val;
  }

  constructor(private router: Router) {
  }

  get team(): any {
    return this._team;
  }
  
  get isValidReport(): boolean {
    return this._name === 'all' ?
      !!this.team.currentTasks :
      this.team.currentTasks && this.team.iteration
  }

  getReport(title: string) {
    this.router.navigate(["/dashboard/project", title], {
      queryParams: { current: 1 }
    });
  }
}