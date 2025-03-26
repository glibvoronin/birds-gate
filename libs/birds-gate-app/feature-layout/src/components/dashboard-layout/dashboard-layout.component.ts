import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@birds-gate/ui-design-system';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { MenuItem } from 'primeng/api';
import { logout, selectUserName } from '@birds-gate/data-access-fe-auth';

@Component({
  selector: 'lib-dashboard-layout',
  imports: [
    CommonModule,
    LayoutComponent,
    RouterOutlet,
    AvatarModule,
    MenuModule,
    ButtonModule,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css',
})
export class DashboardLayoutComponent {
  private readonly store = inject(Store);

  readonly username = this.store.selectSignal(selectUserName);

  readonly avatarLabel = computed(() => {
    return (this.username() ?? '').charAt(0).toUpperCase();
  });

  items: MenuItem[] = [
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => this.signOut(),
    },
  ];

  signOut(): void {
    this.store.dispatch(logout());
  }
}
