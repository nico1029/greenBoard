import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as Mapboxgl from 'mapbox-gl';
import { interval, mergeMap, Subject, take, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MapImagesSrc } from '../../models/map.enum';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  public map!: Mapboxgl.Map;
  public notifier: Subject<null> = new Subject();

  constructor(private readonly mapService: MapService) {
    // TODO
  }

  public ngOnInit(): void {
    this.initializeMap();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'Map Component'); // eslint-disable-line
  }

  public ngOnDestroy(): void {
    this.notifier.next(null);
    this.notifier.complete();
    console.log('Destroying Map Component'); // eslint-disable-line
  }

  private initializeMap(): void {
    this.map = new Mapboxgl.Map({
      accessToken: environment.mapboxKey,
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.063644, 4.624335], // Long, Lat
      zoom: 1,
    });
    this.renderMap();
    this.loadUtilities();
  }

  private renderMap(): void {
    this.map.loadImage(
      this.mapService.baseUrlForImages + this.chooseImageSrc('byke'),
      (error: Error | undefined, image: any) => {
        if (error) throw error;
        this.map.addImage('byke', image);
        this.addSource();
        this.updateSource();
      }
    );
  }

  private chooseImageSrc(markerType: string): string {
    let imageSrc: string = ''; // eslint-disable-line
    switch (markerType) {
      case 'byke':
        imageSrc = MapImagesSrc.Byke;
        break;
    }
    return imageSrc;
  }

  private addSource(): void {
    this.mapService
      .getLocation()
      .pipe(take(1))
      .subscribe((location: any) => {
        this.map.addSource('devices', {
          type: 'geojson',
          data: this.buildMarkers(location),
        });
        this.addLayer();
        this.createPopUp();
      });
  }

  private addLayer(): void {
    this.map.addLayer({
      id: 'devices',
      type: 'symbol',
      source: 'devices',
      layout: {
        'icon-size': 0.5,
        'icon-image': '{icon}',
        'icon-allow-overlap': true,
      },
    });
  }

  private buildMarkers(location: any): any {
    return {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            description: 'Hola',
            icon: 'byke',
          },
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        },
      ],
    };
  }

  private updateSource(): void {
    interval(2000)
      .pipe(
        takeUntil(this.notifier),
        mergeMap(() => this.mapService.getLocation())
      )
      .subscribe((x: any) => {
        const source: Mapboxgl.GeoJSONSource = this.map.getSource(
          'devices'
        ) as Mapboxgl.GeoJSONSource;
        source.setData(this.buildMarkers(x));
      });
  }

  private createPopUp(): void {
    this.map.on('click', 'devices', (e: any) => {
      const coordinates: [number, number] =
        e.features[0].geometry.coordinates.slice();
      const description: string = e.features[0].properties.description;

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new Mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .setOffset(25)
        .addTo(this.map);
    });
  }

  private loadUtilities(): void {
    this.map.on('click', 'devices', (e: any) => {
      this.map.flyTo({
        center: e.features[0].geometry.coordinates,
      });
    });

    this.map.on('mouseenter', 'devices', () => {
      this.map.getCanvas().style.cursor = 'pointer';
    });

    this.map.on('mouseleave', 'devices', () => {
      this.map.getCanvas().style.cursor = '';
    });
  }
}
