import { UsersDashboardTableComponent } from './users-dashboard-table.component';
import { UserResponseDto } from '@birds-gate/util-dto';
import { MockBuilder, MockRender } from 'ng-mocks';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

const sampleUsers: UserResponseDto[] = [
  {
    id: '1',
    username: 'admin',
    role: 'ADMIN',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    username: 'user',
    role: 'USER',
    createdAt: new Date('2023-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
];

describe('UsersDashboardTableComponent', () => {
  beforeEach(() => {
    return MockBuilder(UsersDashboardTableComponent)
      .keep(TableModule)
      .keep(ButtonModule);
  });

  it('should render usernames', () => {
    const fixture = MockRender(UsersDashboardTableComponent, {
      users: sampleUsers,
      isAdmin: false,
      currentUserId: null,
    });

    const rows = fixture.nativeElement.querySelectorAll('td:first-child');
    expect(rows.length).toBe(sampleUsers.length);
    expect(rows[0].textContent).toContain('admin');
    expect(rows[1].textContent).toContain('user');
  });

  it('should render admin-only columns when isAdmin=true', () => {
    const fixture = MockRender(UsersDashboardTableComponent, {
      users: sampleUsers,
      isAdmin: true,
      currentUserId: null,
    });

    const ths = fixture.nativeElement.querySelectorAll('th');
    expect([...ths].map((el) => el.textContent.trim())).toEqual([
      'Username',
      'Role',
      'Created',
      'Last Updated',
      '',
    ]);
  });

  it('should disable edit button for current user', () => {
    const fixture = MockRender(UsersDashboardTableComponent, {
      users: sampleUsers,
      isAdmin: true,
      currentUserId: '1',
    });

    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(false);
  });

  it('should emit editUser event when edit button clicked', () => {
    const fixture = MockRender(UsersDashboardTableComponent, {
      users: sampleUsers,
      isAdmin: true,
      currentUserId: null,
    });

    const component = fixture.point.componentInstance;
    const spy = jest.fn();
    component.editUser.subscribe(spy);

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();

    expect(spy).toHaveBeenCalledWith({ userId: '1' });
  });
});
