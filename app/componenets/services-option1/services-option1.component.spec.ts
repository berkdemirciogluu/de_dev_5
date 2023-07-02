import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesOption1Component } from './services-option1.component';

describe('ServicesOption1Component', () => {
  let component: ServicesOption1Component;
  let fixture: ComponentFixture<ServicesOption1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesOption1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesOption1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
