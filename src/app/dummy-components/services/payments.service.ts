import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { PaymentsStorage, ServicesStorage } from '../models/payments.interface';
import { ErrorDialogService } from 'src/app/core/services/error-dialog.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  public paymentsCollection: AngularFirestoreCollection<PaymentsStorage>;
  public servicesCollection: AngularFirestoreCollection<ServicesStorage>;

  constructor(
    private readonly db: AngularFirestore,
    private readonly errorDialogService: ErrorDialogService
  ) {
    this.paymentsCollection = this.db.collection<PaymentsStorage>('payments');
    this.servicesCollection = this.db.collection<ServicesStorage>('services');
  }

  public getAllPayments(): Observable<PaymentsStorage[]> {
    return this.paymentsCollection.valueChanges({ idField: 'id' });
  }

  public getAllServices(): Observable<ServicesStorage[]> {
    return this.servicesCollection.valueChanges({ idField: 'id' });
  }

  public async addPayment(payment: PaymentsStorage): Promise<string> {
    let paymentId: string = ''; // eslint-disable-line
    try {
      await this.paymentsCollection.add(payment).then((docRef: any) => {
        paymentId = docRef.id;
      });
    } catch (error: any) {
      console.log('Error adding Payment', error); // eslint-disable-line
      this.errorDialogService.openDialog(error.message, 'business-error');
    }
    return paymentId;
  }

  public async addService(service: ServicesStorage): Promise<void> {
    try {
      await this.servicesCollection.add(service);
    } catch (error: any) {
      console.log('Error adding Payment', error); // eslint-disable-line
      this.errorDialogService.openDialog(error.message, 'business-error');
    }
  }

  public updateService(): void {
    // TODO
  }
}
