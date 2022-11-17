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
  private firstQuery: boolean = true; // eslint-disable-line

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
        tap((records: Records[]) => {
          if (this.firstQuery) {
            localStorage.setItem('records', JSON.stringify(records));
            this.firstQuery = false;
          } else {
            const previousRecords: Records[] = JSON.parse(
              localStorage.getItem('records')!
            );
            const newRecords: Records[] = records.concat(previousRecords);
            // Historical activity should be save in MongoDB
            localStorage.setItem('records', JSON.stringify(newRecords));
          }
        })
      );
    },
    { dispatch: false }
  );
}
