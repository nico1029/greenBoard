import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, noop, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Records } from '../models/activity-log.interface';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  public consultedRecord$: BehaviorSubject<Records> = new BehaviorSubject(
    {} as Records
  );

  constructor(private readonly http: HttpClient) {
    // TODO
  }

  public getReverseGeolocation(latLong: [number, number]): Observable<any> {
    const api: string = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLong[0]},${latLong[1]}&key=${environment.gcpConfig.apiKey}`; // eslint-disable-line
    return this.http.get<any>(api);
  }

  public consultRecord(record: Records): void {
    this.getReverseGeolocation(record.lastLatLong)
      .pipe(
        tap((res: any) => {
          // Takes position 1 in results because address seems to be the correct one
          const address: string = res.results[1].formatted_address; // eslint-disable-line
          const consultedRecord: Records = {
            ...record,
            description:
              record.status === 'Lost Connection'
                ? `${record.type} has lost connection`
                : `${record.type} running out of battery at ${record.batteryLevel}%`,
            address: address,
          };
          this.consultedRecord$.next(consultedRecord);
        })
      )
      .subscribe(noop, noop);
  }
}
