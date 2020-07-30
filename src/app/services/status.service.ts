import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TfsDashboardState {
  period: string;
}

export interface ErrorLogsDashboardState {
  app: string;
  env: string;
  type: string;
  to: Date;
  from: Date;
  isLive: boolean;
}

export interface BugDashboardState {
  areaPath: string;
  severity: string;
}

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  // private _appState: BehaviorSubject<any>;
  private _tfsDashboardState: BehaviorSubject<TfsDashboardState>;
  private _errorLogsDashboardState: BehaviorSubject<ErrorLogsDashboardState>;
  private _bugDashboardState: BehaviorSubject<BugDashboardState>;

  appState = {
    ['/tfs-dashboard']: <TfsDashboardState>{},
    ['/error-logs-dashboard']: <ErrorLogsDashboardState>{},
    ['/bug-dashboard']: <BugDashboardState>{},
  };

  constructor() {
    this.recoverState();

    this._tfsDashboardState = new BehaviorSubject(this.appState['/tfs-dashboard']);
    this._errorLogsDashboardState = new BehaviorSubject(this.appState['/error-logs-dashboard']);
    this._bugDashboardState = new BehaviorSubject(this.appState['/bug-dashboard']);
  }

  get tfsDashboardState(): TfsDashboardState {
    return this._tfsDashboardState.getValue();
  }

  set tfsDashboardState(newState: TfsDashboardState) {
    this._tfsDashboardState.next(newState);
    this.saveState();
  }

  get errorLogsDashboardState(): ErrorLogsDashboardState {
    return this._errorLogsDashboardState.getValue();
  }

  set errorLogsDashboardState(newState: ErrorLogsDashboardState) {
    this._errorLogsDashboardState.next(newState);
    this.saveState();
  }

  get bugDashboardState(): BugDashboardState {
    return this._bugDashboardState.getValue();
  }

  set bugDashboardState(newState: BugDashboardState) {
    this._bugDashboardState.next(newState);
    this.saveState();
  }

  saveState() {
    this.appState = {
      ['/tfs-dashboard']: this._tfsDashboardState.getValue(),
      ['/error-logs-dashboard']: this._errorLogsDashboardState.getValue(),
      ['/bug-dashboard']: this._bugDashboardState.getValue(),
    };

    //console.log('save state:', JSON.stringify(this.appState));

    localStorage.setItem('app-state', JSON.stringify(this.appState));
  }

  recoverState() {
    const savedState = localStorage.getItem('app-state');

    if (savedState) this.appState = JSON.parse(savedState);
  }
}
