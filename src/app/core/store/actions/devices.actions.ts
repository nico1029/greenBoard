import { createAction, props } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';

export const updateDevices: any = createAction(
  '[Map Component] Update Devices',
  props<{ devices: Devices[] }>()
);