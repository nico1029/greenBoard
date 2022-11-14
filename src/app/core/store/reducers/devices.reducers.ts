import { createEntityAdapter } from '@ngrx/entity';
import { EntityAdapter, EntityState } from '@ngrx/entity/src';
import { Dictionary, EntitySelectors } from '@ngrx/entity/src/models';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';
import { DevicesActions } from '../action-types';

export const FeatureKey: string = 'devices'; // eslint-disable-line

// Old Device interface without Entity
// export interface DevicesState {
//   devices: Devices[];
// }

// Old Device interface without Entity
// export const initialDevicesState: DevicesState = {
//   devices: [],
// };

// Old Device interface without Entity
// export const devicesReducer: ActionReducer<DevicesState> = createReducer(
//   initialDevicesState,
//   on(
//     DevicesActions.updateDevices,
//     (state: DevicesState, action: any): DevicesState => {
//       return {
//         devices: action.devices,
//       };
//     }
//   )
// );

export interface DevicesState extends EntityState<Devices> {}

export const adapter: EntityAdapter<Devices> = createEntityAdapter<Devices>();

export const initialDevicesState: DevicesState = adapter.getInitialState({});

export const devicesReducer: ActionReducer<DevicesState> = createReducer(
  initialDevicesState,
  on(DevicesActions.updateDevices, (state: DevicesState, action: any) => {
    const updatedDevices: Devices[] = action.devices.map((device: Devices) => {
      return {
        ...device,
        status:
          device.latLong.findIndex((num: any) => num == null) < 0
            ? 'Active'
            : 'Lost Connection',
        isRunOutOfBattery: device.batteryLevel < 30 ? 'True' : 'False',
      };
    });
    return adapter.setAll(updatedDevices, state);
  })
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
}: EntitySelectors<Devices, EntityState<Devices>> = adapter.getSelectors();

export const selectDevicesIds: (
  state: EntityState<Devices>
) => string[] | number[] = selectIds;

export const selectDevicesEntities: (
  state: EntityState<Devices>
) => Dictionary<Devices> = selectEntities;

export const selectAllDevices: (state: EntityState<Devices>) => Devices[] =
  selectAll;

export const selectDevicesTotal: (state: EntityState<Devices>) => number =
  selectTotal;
