import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public usersCollection: AngularFirestoreCollection<User>;

  constructor(private readonly db: AngularFirestore) {
    this.usersCollection = this.db.collection<User>('users');
  }

  public getAllUsers(): Observable<User[]> {
    return this.usersCollection.valueChanges({ idField: 'id' });
  }
}
