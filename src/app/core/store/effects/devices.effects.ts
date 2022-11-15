import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, map } from 'rxjs';
import { Devices } from 'src/app/shared/models/devices.interface';
import { DevicesActions } from '../action-types';
import { reportRecords } from '../actions/records.actions';
import { selectAllDevices } from '../selectors/devices.selectors';

@Injectable()
export class DevicesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {
    // TODO
  }

  public devices$: CreateEffectMetadata = createEffect(() => {
    return this.actions$.pipe(
      ofType(DevicesActions.updateDevices),
      concatMap((action: any) => this.store.select(selectAllDevices)), // eslint-disable-line
      map((devices: Devices[]) => {
        let records: Devices[];
        records = devices.filter(
          (device: Devices) =>
            device.status === 'Lost Connection' ||
            device.isRunOutOfBattery === 'Yes'
        );
        if (records.length >= 1) {
          const oldDevices: Devices[] = JSON.parse(
            localStorage.getItem('devices')!
          );
          // TODO Code case when it does not find any device in local Storage. In this case is returning undefined
          records = records.map((device: Devices) => {
            const oldLatLong: [number, number] = oldDevices.find(
              (x: Devices) => x.id === device.id
            )?.latLong!;
            return { ...device, lastLatLong: oldLatLong };
          });
        }
        localStorage.setItem('devices', JSON.stringify(devices));
        return reportRecords({ records }); // eslint-disable-line
      })
    );
  });
}
