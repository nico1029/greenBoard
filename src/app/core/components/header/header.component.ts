import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserStorage } from '../../models/user.interface';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public user$: BehaviorSubject<UserStorage | undefined> = new BehaviorSubject<
    UserStorage | undefined
  >({} as UserStorage);
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    // TODO
  }

  public ngOnInit(): void {
    this.getUserStorage();
  }

  private getUserStorage(): void {
    this.authService
      .getCurrentUser()
      .pipe(mergeMap((user: any) => this.userService.getUser(user.uid)))
      .subscribe((user: UserStorage | undefined) => this.user$.next(user));
  }
}
