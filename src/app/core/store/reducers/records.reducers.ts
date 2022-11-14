import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Dictionary, EntitySelectors } from '@ngrx/entity/src/models';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Devices } from 'src/app/shared/models/devices.interface';
import { RecordsActions } from '../action-types';

export const FeatureKey: string = 'records'; // eslint-disable-line

export interface DevicesState extends EntityState<Devices> {}

export const adapter: EntityAdapter<Devices> = createEntityAdapter<Devices>();

export const initialRecordsState: DevicesState = adapter.getInitialState({});

export const recordsReducer: ActionReducer<DevicesState> = createReducer(
  initialRecordsState,
  on(RecordsActions.reportedDevices, (state: DevicesState, action: any) =>
    adapter.addMany(action.records, state)
  )
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
}: EntitySelectors<Devices, EntityState<Devices>> = adapter.getSelectors();

export const selectRecordsIds: (
  state: EntityState<Devices>
) => string[] | number[] = selectIds;

export const selectRecordsEntities: (
  state: EntityState<Devices>
) => Dictionary<Devices> = selectEntities;

export const selectAllRecords: (state: EntityState<Devices>) => Devices[] =
  selectAll;

export const selectRecordsTotal: (state: EntityState<Devices>) => number =
  selectTotal;
