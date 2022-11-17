import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Records } from '../../models/activity-log.interface';
import { RecordsService } from '../../services/records.service';
import {
  BehaviorSubject,
  noop,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { RecordsTableComponent } from '../records-table/records-table.component';

@Component({
  selector: 'app-vehicles-modal',
  standalone: true,
  imports: [CommonModule, RecordsTableComponent],
  templateUrl: './vehicles-modal.component.html',
  styleUrls: ['./vehicles-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesModalComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('vehicleModal')
  public vehicleModal!: ElementRef;

  @ViewChildren('tabPanes')
  public tabPanes!: QueryList<ElementRef>;

  @ViewChildren('tabButtons')
  public tabButtons!: QueryList<ElementRef>;

  public consultedVehicle$!: Observable<Records>;
  public consultedRecord: BehaviorSubject<Records[]> = new BehaviorSubject<
    Records[]
  >({} as Records[]);
  public consultedRecord$: Observable<Records[]> =
    this.consultedRecord.asObservable();
  public idVehicle!: number;
  public notifier$: Subject<boolean> = new Subject();

  constructor(private readonly recordsService: RecordsService) {
    // TODO
  }

  public ngOnInit(): void {
    this.consultVehicle();
  }

  public ngAfterViewInit(): void {
    this.modalEvents();
  }

  public ngOnDestroy(): void {
    this.notifier$.next(true);
    this.notifier$.complete();
  }

  private consultVehicle(): void {
    this.consultedVehicle$ = this.recordsService.consultedRecord$;
    this.consultedVehicle$
      .pipe(
        takeUntil(this.notifier$),
        tap((record: Records) => {
          this.idVehicle = record.id;
        })
      )
      .subscribe(noop, noop);
  }

  public consultRecords(): void {
    const records: Records[] = JSON.parse(
      localStorage.getItem('records')!
    ).filter((record: Records) => record.id === this.idVehicle);
    this.consultedRecord.next(records);
  }

  private modalEvents(): void {
    const vehicleModal: HTMLElement = this.vehicleModal.nativeElement;
    vehicleModal.addEventListener('hidden.bs.modal', () => {
      this.tabButtons.first.nativeElement.classList.add('active');
      this.tabButtons.last.nativeElement.classList.remove('active');
      this.tabPanes.first.nativeElement.classList.add('show', 'active');
      this.tabPanes.last.nativeElement.classList.remove('show', 'active');
    });
  }
}
