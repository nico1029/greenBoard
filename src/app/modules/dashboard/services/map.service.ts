import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';
import { environment } from 'src/environments/environment';

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

  // TODO: Modify the type of return to LocationResponse
  public getLocation(): Observable<any> {
    return this.http
      .get<any>(environment.issUrl)
      .pipe(catchError(this.errorHandler.handleError), retry(3));
  }

  public transformLongLat(longLat: Array<string>): [number, number] {
    return [Number(longLat[0]), Number(longLat[1])];
  }
}
