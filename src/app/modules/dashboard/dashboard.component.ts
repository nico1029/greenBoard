import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnChanges {
  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'Dashboard Component'); // eslint-disable-line
  }
}
