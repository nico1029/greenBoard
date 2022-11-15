import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { concatMap, tap } from 'rxjs';
import { Records } from 'src/app/modules/dashboard/models/activity-log.interface';
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
        ofType(RecordsActions.reportRecords),
        concatMap((action: any) => this.store.select(selectAllRecords)), // eslint-disable-line
        tap((records: Records[]) =>
          localStorage.setItem('records', JSON.stringify(records))
        )
      );
    },
    { dispatch: false }
  );
}
