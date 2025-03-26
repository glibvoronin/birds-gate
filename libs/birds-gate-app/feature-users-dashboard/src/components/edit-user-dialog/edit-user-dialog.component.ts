import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserResponseDto } from '@birds-gate/util-dto';
import { UserRoleEnum } from '@birds-gate/util-interfaces';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import {
  editUser,
  selectUserById,
} from '@birds-gate/bg-app-data-access-users-dashboard';
import { SelectModule } from 'primeng/select';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'lib-edit-user-dialog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    InputTextModule,
    ButtonModule,
    PasswordModule,
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserDialogComponent {
  readonly ref = inject(DynamicDialogRef);
  private readonly store = inject(Store);
  private readonly config = inject(DynamicDialogConfig);

  readonly user = this.store.selectSignal(
    selectUserById(this.config.data.userId)
  );

  readonly form = new FormGroup({
    username: new FormControl(
      { value: '', disabled: true },
      {
        nonNullable: true,
        validators: [Validators.required],
      }
    ),
    role: new FormControl<UserRoleEnum>(UserRoleEnum.USER, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  roleOptions = [
    { label: 'User', value: UserRoleEnum.USER },
    { label: 'Admin', value: UserRoleEnum.ADMIN },
  ];

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.form.patchValue({
          username: user.username,
          role: user.role as UserRoleEnum,
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const user: UserResponseDto = {
      ...(this.user() as UserResponseDto),
      ...this.form.value,
    };

    this.store.dispatch(
      editUser({
        user,
        closeDialogCb: () => {
          this.ref.close(user);
        },
      })
    );
  }
}
