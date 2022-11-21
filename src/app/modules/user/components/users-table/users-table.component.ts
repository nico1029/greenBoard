import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorage } from 'src/app/core/models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  public users$: Observable<UserStorage[]>;

  constructor(private readonly userService: UserService) {
    this.users$ = this.userService.getAllUsers();
  }
}
