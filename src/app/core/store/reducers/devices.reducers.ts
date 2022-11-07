import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';
import { DevicesActions } from '../action-types';

export const FeatureKey: string = 'map'; // eslint-disable-line

export interface DevicesState {
  devices: Devices[];
}

export const initialDevicesState: DevicesState = {
  devices: [],
};

export const updateDevicesReducer: ActionReducer<DevicesState> = createReducer(
  initialDevicesState,
  on(
    DevicesActions.updateDevices,
    (state: DevicesState, action: any): DevicesState => {
      return {
        devices: action.devices,
      };
    }
  )
);
