import { createAction, props } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';

export const updateDevices: any = createAction(
  '[Dashboard Page] Update Devices',
  props<{ devices: Devices[] }>()
);
