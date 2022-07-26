import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideBarComponent {
  constructor(private readonly store: Store) {
    // TODO
  }

  public signOut(): void {
    this.store.dispatch(logout());
  }
}
