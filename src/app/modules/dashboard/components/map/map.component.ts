import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges {
  public map!: Mapboxgl.Map;

  public ngOnInit(): void {
    this.map = new Mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9,
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'Map Component'); // eslint-disable-line
  }
}
