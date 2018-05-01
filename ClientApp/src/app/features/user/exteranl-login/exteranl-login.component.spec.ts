import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExteranlLoginComponent } from './exteranl-login.component';

describe('ExteranlLoginComponent', () => {
  let component: ExteranlLoginComponent;
  let fixture: ComponentFixture<ExteranlLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExteranlLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExteranlLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
