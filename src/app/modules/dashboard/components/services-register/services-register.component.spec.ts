import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesRegisterComponent } from './services-register.component';

describe('ServicesRegisterComponent', () => {
  let component: ServicesRegisterComponent;
  let fixture: ComponentFixture<ServicesRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicesRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
