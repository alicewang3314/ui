import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounce } from 'lodash';

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

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private _appState: BehaviorSubject<any>;
  private _tfsDashboardState: BehaviorSubject<TfsDashboardState>;
  private _errorLogsDashboardState: BehaviorSubject<ErrorLogsDashboardState>

  appState = {
    ['/tfs-dashboard']: <TfsDashboardState>{ period: 'current' },
    ['/error-logs-dashboard']: <ErrorLogsDashboardState>{},
    ['/bug-dashboard']: {},
  };

  constructor() {
    this.recoverState();

    this._tfsDashboardState = new BehaviorSubject(this.appState['/tfs-dashboard']);
    this._errorLogsDashboardState = new BehaviorSubject(this.appState['/error-logs-dashboard']);
  }

  // getTfsDashboardState(): Observable<TfsDashboardState> {
  //   return this._tfsDashboard.asObservable();
  // }

  get TfsDashboardState(): TfsDashboardState {
    return this._tfsDashboardState.getValue();
    //return this._tfsDashboardState;
  }

  set TfsDashboardState(newState: TfsDashboardState) {
    this._tfsDashboardState.next(newState);
    // console.log('save state', newState);
    //TODO: move save state to the application state

    this.saveState();
  }

  get ErrorLogsDashboardState(): ErrorLogsDashboardState {
    return this._errorLogsDashboardState.getValue();
  }

  set ErrorLogsDashboardState(newState: ErrorLogsDashboardState) {
    this._errorLogsDashboardState.next(newState);

    //TODO: move save state to the application state

    this.saveState();
  }

  // TODO: if any state changed, save state
  saveState() {
    this.appState = {
      ['/tfs-dashboard']: this._tfsDashboardState.getValue(),//this._tfsDashboard.getValue(),
      ['/error-logs-dashboard']: this._errorLogsDashboardState.getValue(),
      ['/bug-dashboard']: {},
    };

    // console.log('save state:', JSON.stringify(this.appState));

    localStorage.setItem('app-state', JSON.stringify(this.appState));
  }

  recoverState() {
    const savedState = localStorage.getItem('app-state');

    //console.log('restored state', savedState);

    if (savedState) this.appState = JSON.parse(savedState);
  }
}
