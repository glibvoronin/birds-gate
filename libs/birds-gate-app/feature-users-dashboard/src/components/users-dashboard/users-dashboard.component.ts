import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDashboardTableComponent } from '../users-dashboard-table/users-dashboard-table.component';
import { Store } from '@ngrx/store';
import {
  loadUsers,
  selectAllUsers,
} from '@birds-gate/bg-app-data-access-users-dashboard';
import { selectIsAdmin, selectUserId } from '@birds-gate/data-access-fe-auth';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { SearchPipe } from '@birds-gate/bg-app-util-common';

@Component({
  selector: 'lib-users-dashboard',
  imports: [
    CommonModule,
    UsersDashboardTableComponent,
    FormsModule,
    InputTextModule,
    DynamicDialogModule,
    SearchPipe,
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDashboardComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialogService = inject(DialogService);

  readonly users = this.store.selectSignal(selectAllUsers);
  readonly userId = this.store.selectSignal(selectUserId);
  readonly isAdmin = this.store.selectSignal(selectIsAdmin);

  searchTerm: string = '';

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  handleEditUser({ userId }: { userId: string }) {
    this.dialogService.open(EditUserDialogComponent, {
      data: { userId },
      header: 'Edit User',
      width: '500px',
    });
  }
}
