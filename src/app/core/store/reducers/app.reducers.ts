import { routerReducer } from '@ngrx/router-store';
import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { authReducer } from './auth.reducers';

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer,
};

// Metareducers act as a normal reducer but it is triggerd before a normal reducer
export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state: any, action: any) => {
    console.log('state before:', state); // eslint-disable-line
    console.log('action:', action); // eslint-disable-line

    return reducer(state, action); // eslint-disable-line
  };
}

// The order matters of the sequence of meta reducers is triggerd
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
