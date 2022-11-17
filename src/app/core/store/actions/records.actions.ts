import { createAction, props } from '@ngrx/store';
import { Records } from 'src/app/modules/dashboard/models/activity-log.interface';

export const reportRecords: any = createAction(
  '[Map Component] Report Devices',
  props<{ records: Records[] }>()
);
