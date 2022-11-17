import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { Devices } from 'src/app/shared/models/devices.interface';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(
    private readonly http: HttpClient,
    private readonly errorHandler: ErrorHandlerService
  ) {
    // TODO
  }
  // Proxy url
  public baseUrlForImages: string = '/greenboard-8530d.appspot.com/o/'; // eslint-disable-line
  private baseUrlForDevices: string = '/get-devices'; //eslint-disable-line
  public numDevices: number = 10; // eslint-disable-line

  public getLocation(numDevices: number): Observable<Devices[]> {
    const params: HttpParams = new HttpParams({
      fromString: `numDevices=${numDevices}`,
    });
    return this.http
      .get<Devices[]>(this.baseUrlForDevices, { params })
      .pipe(catchError(this.errorHandler.handleError), retry(3));
  }

  public transformLongLat(longLat: Array<string>): [number, number] {
    return [Number(longLat[0]), Number(longLat[1])];
  }
}
