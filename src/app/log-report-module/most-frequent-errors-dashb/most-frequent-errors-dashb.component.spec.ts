import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFrequentErrorsDashbComponent } from './most-frequent-errors-dashb.component';

describe('MostFrequentErrorsDashbComponent', () => {
  let component: MostFrequentErrorsDashbComponent;
  let fixture: ComponentFixture<MostFrequentErrorsDashbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostFrequentErrorsDashbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostFrequentErrorsDashbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
