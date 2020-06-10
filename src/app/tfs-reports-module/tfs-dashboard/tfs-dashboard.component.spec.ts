import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TfsDashboardComponent } from './tfs-dashboard.component';

describe('TfsDashboardComponent', () => {
  let component: TfsDashboardComponent;
  let fixture: ComponentFixture<TfsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TfsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TfsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
