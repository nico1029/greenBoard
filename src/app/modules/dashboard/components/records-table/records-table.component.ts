import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Records } from '../../models/activity-log.interface';
import { RecordsService } from '../../services/records.service';

@Component({
  selector: 'app-records-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecordsTableComponent {
  @Input()
  public records$!: Observable<Records[]>;

  @Input()
  public size!: string;

  @Input()
  public needConsult!: string;

  constructor(private readonly recordsService: RecordsService) {
    // TODO
  }

  public consultDetailRecord(record: Records): void {
    this.recordsService.consultRecord(record);
  }
}
