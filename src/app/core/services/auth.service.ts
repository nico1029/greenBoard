import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';
import { FirebaseError } from 'firebase/app';
import { map, Observable } from 'rxjs';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserStorage } from '../models/user.interface';
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
    private readonly store: Store,
    private readonly userService: UserService
  ) {
    // TODO
  }

  public signIn(email: string, password: string): void {
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
      .catch((res: FirebaseError) =>
        this.errorDialogService.openDialog(res.message, 'user-not-found')
      );
  }

  public signOut(): void {
    this.afAuth.signOut();
  }

  public createAuthUser(user: UserStorage, password: string): void {
    this.afAuth
      .createUserWithEmailAndPassword(user.email, password)
      .then((res: any) => {
        const currentDate: string = new Date().toJSON();
        const newUser: UserStorage = {
          ...user,
          lastUpdate: currentDate,
          createdAt: currentDate,
          lastLogin: '',
        };
        this.userService.addUser(res.user.uid, newUser);
      })
      .catch((res: FirebaseError) =>
        this.errorDialogService.openDialog(res.message, 'user-not-created')
      );
  }

  public userIsLoggedIn(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map((user: any) => {
        if (user) return true;
        return false;
      })
    );
  }

  public getCurrentUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      map((user: any) => {
        return user; // eslint-disable-line
      })
    );
  }

  public removeAuthUser(): void {
    // TODO
  }
}
