import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveErrorLogsComponent } from './live-error-logs.component';

describe('LiveErrorLogsComponent', () => {
  let component: LiveErrorLogsComponent;
  let fixture: ComponentFixture<LiveErrorLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveErrorLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveErrorLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
