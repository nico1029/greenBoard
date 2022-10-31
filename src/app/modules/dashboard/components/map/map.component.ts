import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as Mapboxgl from 'mapbox-gl';
import { interval, mergeMap, noop, Subject, take, takeUntil, tap } from 'rxjs';
import { updateDevices } from 'src/app/core/store/actions/devices.actions';
import { Devices } from 'src/app/shared/models/devices.interface';
import { environment } from 'src/environments/environment';
import { MapImagesSrc } from '../../models/map.enum';
import { MarkerFeatures } from '../../models/map.interface';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnChanges, OnDestroy {
  public map!: Mapboxgl.Map;
  public notifier: Subject<null> = new Subject();

  constructor(
    private readonly mapService: MapService,
    private readonly store: Store
  ) {
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
      center: [-74.103644, 4.674335], // Long, Lat
      zoom: 10,
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
      .getLocation(this.mapService.numDevices)
      .pipe(
        take(1),
        tap((devices: Devices[]) => {
          this.map.addSource('devices', {
            type: 'geojson',
            data: this.buildMarkers(devices),
          });
          this.addLayer();
          this.createPopUp();
        })
      )
      .subscribe(noop, noop);
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

  private buildMarkers(devices: Devices[]): any {
    this.store.dispatch(updateDevices({ devices }));
    let markerFeatures: MarkerFeatures[];
    markerFeatures = [];
    devices.forEach((device: Devices) => {
      const feature: MarkerFeatures = {
        type: device.type,
        properties: {
          description: `The device id is ${device.deviceId}`,
          icon: device.type,
        },
        geometry: {
          type: 'Point',
          coordinates: [device.latLong[1], device.latLong[0]],
        },
      };
      markerFeatures.push(feature);
    });
    return {
      type: 'FeatureCollection',
      features: markerFeatures,
    };
  }

  private updateSource(): void {
    interval(5000)
      .pipe(
        takeUntil(this.notifier),
        mergeMap(() => this.mapService.getLocation(this.mapService.numDevices)),
        tap((devices: Devices[]) => {
          const source: Mapboxgl.GeoJSONSource = this.map.getSource(
            'devices'
          ) as Mapboxgl.GeoJSONSource;
          source.setData(this.buildMarkers(devices));
        })
      )
      .subscribe(noop, noop);
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
