import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  CreateEffectMetadata,
  ofType,
} from '@ngrx/effects';
import { tap } from 'rxjs';
import { DevicesActions } from '../action-types';

@Injectable()
export class DevicesEffects {
  constructor(private readonly actions$: Actions) {
    // TODO
  }

  public devices$: CreateEffectMetadata = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(DevicesActions.updateDevices),
        tap((action: any) =>
          localStorage.setItem('devices', JSON.stringify(action.devices))
        )
      );
    },
    { dispatch: false }
  );
}
