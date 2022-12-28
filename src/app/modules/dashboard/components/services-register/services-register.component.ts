import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
  ServicesStorage,
  ServicesStorageStatus,
} from 'src/app/dummy-components/models/payments.interface';
import { PaymentsService } from 'src/app/dummy-components/services/payments.service';

@Component({
  selector: 'app-services-register',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-register.component.html',
  styleUrls: ['./services-register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesRegisterComponent {
  public services$: Observable<ServicesStorage[]>;
  public activeStatus: string = 'Active'; // eslint-disable-line

  constructor(private readonly paymentsService: PaymentsService) {
    this.services$ = this.getServicesAccordingStatus(
      ServicesStorageStatus.Active
    );
  }

  public changeServices(status: string): void {
    const selectedStatus: ServicesStorageStatus =
      status === 'Active'
        ? ServicesStorageStatus.Active
        : ServicesStorageStatus.Finished;
    this.services$ = this.getServicesAccordingStatus(selectedStatus);
    this.activeStatus = status;
  }

  private getServicesAccordingStatus(
    status: ServicesStorageStatus
  ): Observable<ServicesStorage[]> {
    return this.paymentsService
      .getAllServices()
      .pipe(
        map((services: ServicesStorage[]) =>
          services.filter(
            (service: ServicesStorage) => service.status === status
          )
        )
      );
  }
}
