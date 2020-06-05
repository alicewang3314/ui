import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostFrequentExceptionsComponent } from './most-frequent-exceptions.component';

describe('MostFrequentExceptionsComponent', () => {
  let component: MostFrequentExceptionsComponent;
  let fixture: ComponentFixture<MostFrequentExceptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostFrequentExceptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostFrequentExceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
