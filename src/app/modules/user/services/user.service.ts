import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { UserStorage } from 'src/app/core/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersCollection: AngularFirestoreCollection<UserStorage>;

  constructor(private readonly db: AngularFirestore) {
    this.usersCollection = this.db.collection<UserStorage>('users');
  }

  public getAllUsers(): Observable<UserStorage[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }

  public getUser(uid: string): Observable<UserStorage | undefined > {
    return this.usersCollection.doc(uid).valueChanges();
  }

  public addUser(uid: string, user: UserStorage): void {
    this.usersCollection.doc(uid).set(user);
  }

  public updateUser(): void {
    // TODO
  }

  public removeUser(): void {
    // TODO
  }
}
