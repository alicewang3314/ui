import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private _activeTabIndex: BehaviorSubject<number>;

  constructor() {
    this._activeTabIndex = new BehaviorSubject(0);
  }

  getActiveTabIndex(): Observable<number> {
    return this._activeTabIndex.asObservable();
  }

  set activeTabIndex(index: number) {
    this._activeTabIndex.next(index);
  }
}
