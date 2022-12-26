import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  PaymentForm,
  PaymentsStorage,
  ServicesStorage,
  ServicesStorageStatus,
} from '../../models/payments.interface';
import { PaymentMethods } from '../../models/payments.enum';
import { PaymentsService } from '../../services/payments.service';
import { Observable, map } from 'rxjs';
import { UserService } from 'src/app/modules/user/services/user.service';
import { UserStorage } from 'src/app/core/models/user.interface';
import { DevicesService } from 'src/app/modules/devices/services/devices.service';
import { VehicleStorage } from 'src/app/shared/models/devices.interface';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {
  public paymentMethods: string[] = Object.values(PaymentMethods);
  public service: ServicesStorage = {} as ServicesStorage;
  public userId: string = ''; // eslint-disable-line
  public vehicleBoardReference: string = ''; // eslint-disable-line
  public users$: Observable<UserStorage[]>;
  public services$: Observable<ServicesStorage[]>;
  public vehicles$: Observable<VehicleStorage[]>;

  public paymentForm: FormGroup = this.nonFb.group<PaymentForm>({
    amount: [0, Validators.required],
    currency: ['COP', Validators.required],
    method: ['', Validators.required],
    user: ['', Validators.required],
    vehicleBoardReference: ['', Validators.required],
  });

  constructor(
    private readonly nonFb: NonNullableFormBuilder,
    private readonly paymentsService: PaymentsService,
    private readonly userService: UserService,
    private readonly vehiclesService: DevicesService
  ) {
    this.users$ = this.userService.getAllUsers();
    this.services$ = this.servicesActive;
    this.vehicles$ = this.vehiclesService.getAllVehicles();
  }

  public onSubmit(): void {
    const payment: PaymentsStorage = this.buildPayment();
    this.paymentsService.addPayment(payment).then((paymentId: string) => {
      const service: ServicesStorage = this.buildService(paymentId);
      this.paymentsService.addService(service);
    });
    this.userId = this.paymentForm.get('user')?.value;
    this.vehicleBoardReference = this.paymentForm.get(
      'vehicleBoardReference'
    )?.value;
    this.paymentForm.reset();
  }

  public get servicesActive(): Observable<ServicesStorage[]> {
    return this.paymentsService.getAllServices().pipe(
      map((services: ServicesStorage[]) => {
        return services.filter(
          (service: ServicesStorage) =>
            service.status === ServicesStorageStatus.Active
        );
      })
    );
  }

  public buildPayment(): PaymentsStorage {
    const payment: PaymentsStorage = {
      amount: this.paymentForm.get('amount')?.value,
      createdAt: new Date(),
      currency: this.paymentForm.get('currency')?.value,
      method: this.paymentForm.get('method')?.value,
      user: this.paymentForm.get('user')?.value,
    };
    return payment;
  }

  public buildService(paymentId: string): ServicesStorage {
    const service: ServicesStorage = {
      initiatedAt: new Date().toString(),
      payment: paymentId,
      status: ServicesStorageStatus.Active,
      totalTime: '',
      user: this.userId,
      vehicleBoardReference: this.vehicleBoardReference,
    };
    return service;
  }

  public finishService(): void {
    const service: ServicesStorage = {
      ...this.service,
      endedAt: new Date().toString(),
      status: ServicesStorageStatus.Finished,
      totalTime: this.constructTotalTime(),
    };
    this.paymentsService.updateService(this.service.id!, service);
  }

  private constructTotalTime(): string {
    const totalTimeMinutes: number = Math.floor(
      (new Date().getTime() - new Date(this.service.initiatedAt).getTime()) /
        60000
    );
    if (totalTimeMinutes >= 60) {
      return `${Math.floor(totalTimeMinutes / 60).toString()} hours`;
    }
    return `${totalTimeMinutes} minutes`;
  }
}
