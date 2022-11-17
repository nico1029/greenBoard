import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesModalComponent } from './vehicles-modal.component';

describe('VehiclesModalComponent', () => {
  let component: VehiclesModalComponent;
  let fixture: ComponentFixture<VehiclesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VehiclesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
