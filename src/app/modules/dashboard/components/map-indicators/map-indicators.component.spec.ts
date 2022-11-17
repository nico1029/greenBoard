import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapIndicatorsComponent } from './map-indicators.component';

describe('MapIndicatorsComponent', () => {
  let component: MapIndicatorsComponent;
  let fixture: ComponentFixture<MapIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MapIndicatorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
