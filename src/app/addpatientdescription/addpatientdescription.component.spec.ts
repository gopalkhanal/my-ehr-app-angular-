import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpatientDetailsComponent } from './addpatientdescription.component';

describe('AddpatientDetailsComponent', () => {
  let component: AddpatientDetailsComponent;
  let fixture: ComponentFixture<AddpatientDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpatientDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpatientDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
