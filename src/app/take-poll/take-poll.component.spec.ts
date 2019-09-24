import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePollComponent } from './take-poll.component';

describe('TakePollComponent', () => {
  let component: TakePollComponent;
  let fixture: ComponentFixture<TakePollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TakePollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
