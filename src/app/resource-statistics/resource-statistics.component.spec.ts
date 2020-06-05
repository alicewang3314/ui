import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceStatisticsComponent } from './resource-statistics.component';

describe('ResourceStatisticsComponent', () => {
  let component: ResourceStatisticsComponent;
  let fixture: ComponentFixture<ResourceStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResourceStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
