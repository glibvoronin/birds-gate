import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { UserResponseDto } from '@birds-gate/util-dto';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'lib-users-dashboard-table',
  imports: [CommonModule, TableModule, ButtonModule],
  templateUrl: './users-dashboard-table.component.html',
  styleUrl: './users-dashboard-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDashboardTableComponent {
  readonly users = input.required<UserResponseDto[]>();
  readonly isAdmin = input.required<boolean>();
  readonly currentUserId = input.required<string | null>();

  readonly editUser = output<{ userId: string }>();
}
