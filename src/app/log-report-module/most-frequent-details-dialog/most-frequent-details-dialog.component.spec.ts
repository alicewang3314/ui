import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFrequentDetailsDialogComponent } from './most-frequent-details-dialog.component';

describe('MostFrequentDetailsDialogComponent', () => {
  let component: MostFrequentDetailsDialogComponent;
  let fixture: ComponentFixture<MostFrequentDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostFrequentDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostFrequentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
