import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { login } from '../store/actions/auth.actions';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;

  constructor(
    private readonly afAuth: AngularFireAuth, // Inject Firebase auth service
    private readonly errorDialogService: ErrorDialogService,
    private readonly store: Store
  ) {
    // Saving user data in localstorage when logged in and setting up null when logged out
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  public SignIn(email: string, password: string): void {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.authState.subscribe((user: any) => {
          if (user) {
            this.store.dispatch(
              login({ user: JSON.parse(JSON.stringify(user)) })
            );
          }
        });
      })
      .catch(() => {
        this.errorDialogService.openDialog('user-not-found');
      });
  }
}
