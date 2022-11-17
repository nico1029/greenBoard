import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './reducers/auth.reducers';
import { devicesReducer } from './reducers/devices.reducers';
import { recordsReducer } from './reducers/records.reducers';

export const appReducers: ActionReducerMap<any> = {
  router: routerReducer,
  auth: authReducer,
};

export const dashboardReducers: ActionReducerMap<any> = {
  devices: devicesReducer,
  records: recordsReducer,
};
