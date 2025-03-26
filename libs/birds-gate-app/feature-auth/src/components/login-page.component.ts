import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { Store } from '@ngrx/store';
import { login } from '../../../data-access-auth/src/+state/auth.actions';
import {
  selectLoginErrorMessage,
  selectLoginFetching,
} from '../../../data-access-auth/src/+state/auth.selectors';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'lib-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    PasswordModule,
    MessageModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
})
export class LoginPageComponent {
  readonly form = new FormGroup({
    username: new FormControl<string>('', { validators: Validators.required }),
    password: new FormControl<string>('', { validators: Validators.required }),
  });

  readonly loginFetching = this.store.selectSignal(selectLoginFetching);
  readonly loginErrorMessage = this.store.selectSignal(selectLoginErrorMessage);

  constructor(private readonly store: Store) {}

  onSubmit() {
    const { username, password } = this.form.value;
    if (!username || !password) {
      return;
    }
    this.store.dispatch(login({ username, password }));
  }
}
