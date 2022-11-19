import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Roles } from '../../models/user.enum';
import { User, UserForm } from '../../models/user.interface';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput')
  public passwordInput!: ElementRef<HTMLInputElement>;

  public roles: string[] = Object.values(Roles);
  private notifier$: Subject<any> = new Subject();

  public userForm: FormGroup = this.nonFb.group<UserForm>({
    autoGenerate: [false],
    email: ['', [Validators.required, Validators.email]],
    fullName: [
      '',
      [Validators.required, Validators.pattern('^[a-zA-Z]+.*[a-zA-Z]+$')],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(8), Validators.pattern('.*')],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10),
      ],
    ],
    phoneIndicator: ['+57', Validators.required],
    picture: [''],
    role: [this.roles[1], Validators.required],
  });

  constructor(private readonly nonFb: NonNullableFormBuilder) {
    // TODO
  }

  public ngOnInit(): void {
    this.userForm
      .get('autoGenerate')
      ?.valueChanges.pipe(takeUntil(this.notifier$))
      .subscribe((generate: boolean) => this.generatePassword(generate));
  }

  public ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete();
  }

  private generatePassword(generate: boolean): void {
    if (generate) {
      const randomPassword: string = Math.random().toString(36).slice(-8);
      this.password?.setValue(randomPassword);
      this.passwordInput.nativeElement.disabled = true;
    } else {
      this.password?.setValue('');
      this.passwordInput.nativeElement.disabled = false;
    }
  }

  public createUser(): void {
    const currentDate: string = new Date().toJSON();
    const [name, lastName]: string[] = this.fullName?.value.split('');
    const user: User = {
      email: this.email?.value,
      lastName: lastName,
      lastUpdate: currentDate,
      createdAt: currentDate,
      name: name,
      phone: this.phoneIndicator?.value + this.phone?.value,
      picture: '',
      role: this.role?.value,
    };
    console.log('User created', user); // eslint-disable-line
  }

  public get email(): AbstractControl | null {
    return this.userForm.get('email');
  }

  public get lastLogin(): AbstractControl | null {
    return this.userForm.get('lastLogin');
  }

  public get fullName(): AbstractControl | null {
    return this.userForm.get('fullName');
  }

  public get password(): AbstractControl | null {
    return this.userForm.get('password');
  }

  public get phone(): AbstractControl | null {
    return this.userForm.get('phone');
  }

  public get phoneIndicator(): AbstractControl | null {
    return this.userForm.get('phoneIndicator');
  }

  public get picture(): AbstractControl | null {
    return this.userForm.get('picture');
  }

  public get role(): AbstractControl | null {
    return this.userForm.get('role');
  }
}
