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
import { reportedDevices } from '../actions/records.actions';
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
        localStorage.setItem('devices', JSON.stringify(devices));
        const records: Devices[] = devices.filter(
          (device: Devices) =>
            device.status === 'Lost Connection' ||
            device.isRunOutOfBattery === 'Yes'
        );
        return reportedDevices({ records }); // eslint-disable-line
      })
    );
  });
}
