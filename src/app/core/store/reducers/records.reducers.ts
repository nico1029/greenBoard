import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Dictionary, EntitySelectors } from '@ngrx/entity/src/models';
import { ActionReducer, createReducer, on } from '@ngrx/store';
import { Records } from 'src/app/modules/dashboard/models/activity-log.interface';
import { RecordsActions } from '../action-types';

export const FeatureKey: string = 'records'; // eslint-disable-line

export interface RecordsState extends EntityState<Records> {}

export const adapter: EntityAdapter<Records> = createEntityAdapter<Records>();

export const initialRecordsState: RecordsState = adapter.getInitialState({});

export const recordsReducer: ActionReducer<RecordsState> = createReducer(
  initialRecordsState,
  on(RecordsActions.reportRecords, (state: RecordsState, action: any) =>
    // TODO Find the way to add all records into store ignoring the id
    adapter.setAll(action.records, state)
  )
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
}: EntitySelectors<Records, EntityState<Records>> = adapter.getSelectors();

export const selectRecordsIds: (
  state: EntityState<Records>
) => string[] | number[] = selectIds;

export const selectRecordsEntities: (
  state: EntityState<Records>
) => Dictionary<Records> = selectEntities;

export const selectAllRecords: (state: EntityState<Records>) => Records[] =
  selectAll;

export const selectRecordsTotal: (state: EntityState<Records>) => number =
  selectTotal;
