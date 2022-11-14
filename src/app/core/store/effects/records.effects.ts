import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, tap } from 'rxjs';
import { Devices } from 'src/app/shared/models/devices.interface';
import { RecordsActions } from '../action-types';
import { selectAllRecords } from '../selectors/records.selectors';

@Injectable()
export class RecordsEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store
  ) {
    // TODO
  }

  public records$: CreateEffectMetadata = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(RecordsActions.reportedDevices),
        concatMap((action: any) => this.store.select(selectAllRecords)), // eslint-disable-line
        tap((records: Devices[]) =>
          localStorage.setItem('records', JSON.stringify(records))
        )
      );
    },
    { dispatch: false }
  );
}
