import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import {
  selectAllRecords,
  selectAllRecordsDisconnected,
  selectAllRecordsROB,
} from 'src/app/core/store/selectors/records.selectors';
import { Filters } from 'src/app/shared/models/devices-status.enum';
import { Records } from '../../models/activity-log.interface';
import { RecordsTableComponent } from '../records-table/records-table.component';
import { VehiclesModalComponent } from '../vehicles-modal/vehicles-modal.component';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [
    CommonModule,
    VehiclesModalComponent,
    FormsModule,
    ReactiveFormsModule,
    RecordsTableComponent,
  ],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityLogComponent implements OnInit, OnDestroy {
  public records$!: Observable<Records[]>;
  public historicalRecords$: BehaviorSubject<Records[]> = new BehaviorSubject(
    [] as Records[]
  );
  private notifier$: Subject<any> = new Subject();
  public filters: string[] = Object.values(Filters);

  public selectForm: FormGroup = this.fb.group<any>({
    options: ['All'],
  });

  constructor(private readonly store: Store, private readonly fb: FormBuilder) {
    // TODO
  }

  public ngOnInit(): void {
    this.removePreviousRecords();
    this.captureRecords();
    this.selectForm.valueChanges
      .pipe(takeUntil(this.notifier$))
      .subscribe((option: any) => this.selectFilters(option));
  }

  public ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  private captureRecords(): void {
    this.records$ = this.store.select(selectAllRecords);
    this.records$.pipe(takeUntil(this.notifier$)).subscribe(() => {
      this.historicalRecords$.next(
        JSON.parse(localStorage.getItem('records')!)
      );
    });
  }

  public changeRecords(type: string): void {
    if (type == 'Live') {
      this.selectForm.patchValue({ options: 'All' });
    } else {
      this.records$ = this.historicalRecords$.asObservable();
    }
  }

  private selectFilters(filter: any): void {
    switch (filter.options) {
      case Filters.All:
        this.records$ = this.store.select(selectAllRecords);
        break;
      case Filters.BeingRobbed:
        this.records$ = this.store.select(selectAllRecords);
        break;
      case Filters.Disconnected:
        this.records$ = this.store.select(selectAllRecordsDisconnected);
        break;
      case Filters.LowOfBattery:
        this.records$ = this.store.select(selectAllRecordsROB);
        break;
    }
  }

  // Removes records from localStorage. See Records effects to see comment
  private removePreviousRecords(): void {
    localStorage.removeItem('records');
  }
}
