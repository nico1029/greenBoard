import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
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
