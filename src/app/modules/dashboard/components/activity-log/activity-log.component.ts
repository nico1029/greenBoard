import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllRecords } from 'src/app/core/store/selectors/records.selectors';
import { Records } from '../../models/activity-log.interface';
import { RecordsService } from '../../services/records.service';
import { VehiclesModalComponent } from '../vehicles-modal/vehicles-modal.component';

@Component({
  selector: 'app-activity-log',
  standalone: true,
  imports: [CommonModule, VehiclesModalComponent],
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityLogComponent implements OnInit {
  public records$!: Observable<Records[]>;
  public consultedRecord!: Records;

  constructor(
    private readonly store: Store,
    private readonly recordsService: RecordsService
  ) {
    // TODO
  }

  public ngOnInit(): void {
    this.captureRecords();
  }

  private captureRecords(): void {
    this.records$ = this.store.select(selectAllRecords);
  }

  public consultRecord(record: Records): void {
    this.recordsService.consultRecord(record);
  }
}
