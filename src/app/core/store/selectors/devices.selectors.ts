import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { DevicesState } from '../reducers/devices.reducers';
import * as fromDevices from './../reducers/devices.reducers';

export const selectOperationState: MemoizedSelector<any, any> =
  createFeatureSelector<DevicesState>('operation');

export const selectDevicesState: MemoizedSelector<any, any> = createSelector(
  selectOperationState,
  (state: any) => state.devices // eslint-disable-line
);

// Old devices selector without entity
// export const selectDevices: MemoizedSelector<any, any> = createSelector(
//   selectMapState,
//   (map: DevicesState) => map.devices
export const selectAllDevices: MemoizedSelector<any, any> = createSelector(
  selectDevicesState,
  fromDevices.selectAllDevices
);

export const selectDevicesEntities: MemoizedSelector<any, any> = createSelector(
  selectDevicesState,
  fromDevices.selectDevicesEntities
);

export const selectTotalDevices: MemoizedSelector<any, any> = createSelector(
  selectDevicesState,
  fromDevices.selectDevicesTotal
);
