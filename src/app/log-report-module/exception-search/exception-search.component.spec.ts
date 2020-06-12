import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionSearchComponent } from './exception-search.component';

describe('ExceptionSearchComponent', () => {
  let component: ExceptionSearchComponent;
  let fixture: ComponentFixture<ExceptionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
