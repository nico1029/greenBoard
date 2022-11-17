import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTotalDevices } from 'src/app/core/store/selectors/devices.selectors';
import {
  selectTotalRecordsDisconnected,
  selectTotalRecordsROB,
} from 'src/app/core/store/selectors/records.selectors';

@Component({
  selector: 'app-map-indicators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-indicators.component.html',
  styleUrls: ['./map-indicators.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapIndicatorsComponent implements OnInit {
  public totalDevices$!: Observable<number>;
  public totalRecordsDisconnected$!: Observable<number>;
  public totalRecordsROB$!: Observable<number>;

  constructor(private readonly store: Store) {
    // TODO
  }

  public ngOnInit(): void {
    this.getIndicators();
  }

  private getIndicators(): void {
    this.totalDevices$ = this.store.select(selectTotalDevices);
    this.totalRecordsDisconnected$ = this.store.select(
      selectTotalRecordsDisconnected
    );
    this.totalRecordsROB$ = this.store.select(selectTotalRecordsROB);
  }
}
