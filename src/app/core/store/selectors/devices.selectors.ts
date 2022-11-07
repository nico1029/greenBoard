import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';
import { DevicesState } from '../reducers/devices.reducers';

export const selectMapState: MemoizedSelector<any, any> =
  createFeatureSelector<DevicesState>('map');

export const selectDevices: MemoizedSelector<any, any> = createSelector(
  selectMapState,
  (map: DevicesState) => map.devices
);
