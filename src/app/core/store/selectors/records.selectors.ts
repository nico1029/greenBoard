import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { Records } from 'src/app/modules/dashboard/models/activity-log.interface';
import { DevicesStatus } from 'src/app/shared/models/devices-status.enum';
import { DevicesState } from '../reducers/devices.reducers';
import * as fromRecords from './../reducers/records.reducers';

export const selectOperationState: MemoizedSelector<any, any> =
  createFeatureSelector<DevicesState>('operation');

export const selectRecordsState: MemoizedSelector<any, any> = createSelector(
  selectOperationState,
  (state: any) => state.records // eslint-disable-line
);

export const selectAllRecords: MemoizedSelector<any, any> = createSelector(
  selectRecordsState,
  fromRecords.selectAllRecords
);

export const selectTotalRecords: MemoizedSelector<any, any> = createSelector(
  selectRecordsState,
  fromRecords.selectRecordsTotal
);

export const selectAllRecordsDisconnected: MemoizedSelector<any, any> =
  createSelector(selectAllRecords, (records: Records[]) =>
    records.filter(
      (record: Records) => record.status === DevicesStatus.Disconnected
    )
  );

export const selectTotalRecordsDisconnected: MemoizedSelector<any, any> =
  createSelector(
    selectAllRecordsDisconnected,
    (records: Records[]) => records.length
  );

export const selectAllRecordsROB: MemoizedSelector<any, any> = createSelector(
  selectAllRecords,
  (records: Records[]) =>
    records.filter((record: Records) => record.isRunOutOfBattery === 'Yes')
);

export const selectTotalRecordsROB: MemoizedSelector<any, any> = createSelector(
  selectAllRecordsROB,
  (records: Records[]) => records.length
);
