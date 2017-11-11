import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepatientdescriptionComponent } from './updatepatientdescription.component';

describe('UpdatepatientdescriptionComponent', () => {
  let component: UpdatepatientdescriptionComponent;
  let fixture: ComponentFixture<UpdatepatientdescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatepatientdescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepatientdescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
