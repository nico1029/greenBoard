import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginForm } from 'src/app/core/models/user.interface';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnChanges {
  public loginForm: FormGroup = this.nonFb.group<LoginForm>({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private readonly nonFb: NonNullableFormBuilder,
    private readonly authService: AuthService
  ) {
    // TODO
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, 'SignIn Component'); // eslint-disable-line
  }

  public onSubmit(): void {
    const email: string = this.loginForm.value.email;
    const password: string = this.loginForm.value.password;
    this.authService.signIn(email, password);
    this.loginForm.reset();
  }

  public get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  public get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }
}
