import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private _activeTabIndex: BehaviorSubject<number>;
  appState = {
    ['/tfs-dashboard']: { activeTabIndex: 0 },
    ['/error-logs-dashboard']: {},
    ['/bug-dashboard']: {},
  };

  constructor() {
    this.recoverState();
    
    this._activeTabIndex = new BehaviorSubject(this.appState["/tfs-dashboard"].activeTabIndex);
  }

  getActiveTabIndex(): Observable<number> {
    return this._activeTabIndex.asObservable();
  }

  set activeTabIndex(index: number) {
    this._activeTabIndex.next(index);
    this.saveState();
  }

  saveState() {
    this.appState = {
      ['/tfs-dashboard']: { activeTabIndex: this._activeTabIndex.value },
      ['/error-logs-dashboard']: {},
      ['/bug-dashboard']: {},
    };

    localStorage.setItem('app-state', JSON.stringify(this.appState));
  }

  recoverState() {
    const savedState = localStorage.getItem('app-state');
    if (savedState) this.appState = JSON.parse(savedState);
  }
}
