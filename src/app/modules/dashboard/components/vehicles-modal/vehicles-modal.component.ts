import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Records } from '../../models/activity-log.interface';
import { RecordsService } from '../../services/records.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicles-modal.component.html',
  styleUrls: ['./vehicles-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VehiclesModalComponent implements OnInit {
  public consultedRecord$!: Observable<Records>;

  constructor(private readonly recordsService: RecordsService) {
    // TODO
  }

  public ngOnInit(): void {
    this.consultRecord();
  }

  private consultRecord(): void {
    this.consultedRecord$ = this.recordsService.consultedRecord$;
  }
}
