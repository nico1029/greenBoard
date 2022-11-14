import { createAction, props } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';

export const reportedDevices: any = createAction(
  '[Map Component] Report Devices',
  props<{ records: Devices[] }>()
);
