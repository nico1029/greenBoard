import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { VehicleStorage } from 'src/app/shared/models/devices.interface';

@Injectable({
  providedIn: 'root',
})
export class DevicesService {
  public vehiclesCollection: AngularFirestoreCollection<VehicleStorage>;

  constructor(private readonly db: AngularFirestore) {
    this.vehiclesCollection = this.db.collection<VehicleStorage>('vehicles');
  }

  public getAllVehicles(): Observable<VehicleStorage[]> {
    return this.vehiclesCollection.valueChanges({ idField: 'id' });
  }

  public findByBoardReference(): void {
    // TODO
  }
}
