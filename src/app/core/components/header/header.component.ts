import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { selectUser } from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public user$: Observable<User>;
  constructor(private readonly store: Store) {
    // TODO
    this.user$ = this.store.select(selectUser);
  }
}
