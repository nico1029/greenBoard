import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: any;

  constructor(
    private readonly afAuth: AngularFireAuth, // Inject Firebase auth service
    private readonly router: Router,
    private readonly errorDialogService: ErrorDialogService
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
            this.router.navigate(['dashboard']);
          }
        });
      })
      .catch(() => {
        this.errorDialogService.openDialog('user-not-found');
      });
  }

  public SignOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }

  public get isLoggedIn(): boolean {
    const user: any = JSON.parse(localStorage.getItem('user')!);
    if (user !== null) {
      return true;
    }
    return false;
  }
}
