import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersDashboardTableComponent } from '../users-dashboard-table/users-dashboard-table.component';

@Component({
  selector: 'lib-users-dashboard',
  imports: [CommonModule, UsersDashboardTableComponent],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersDashboardComponent {}
