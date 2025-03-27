import { UsersDashboardComponent } from './users-dashboard.component';
import { MockBuilder, MockRender } from 'ng-mocks';
import { provideMockStore } from '@ngrx/store/testing';
import { DialogService } from 'primeng/dynamicdialog';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { selectAllUsers } from '@birds-gate/bg-app-data-access-users-dashboard';
import { selectIsAdmin, selectUserId } from '@birds-gate/data-access-fe-auth';

describe('UsersDashboardComponent', () => {
  const dialogService = {
    open: jest.fn(),
  };

  beforeEach(() =>
    MockBuilder(UsersDashboardComponent)
      .mock(EditUserDialogComponent)
      .mock(DialogService, dialogService)
      .provide(
        provideMockStore({
          selectors: [
            {
              selector: selectAllUsers,
              value: [
                {
                  id: '1',
                  username: 'admin',
                  role: 'ADMIN',
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              ],
            },
            { selector: selectIsAdmin, value: true },
            { selector: selectUserId, value: '1' },
          ],
        })
      )
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render "Add user" button when isAdmin=true', () => {
    const fixture = MockRender(UsersDashboardComponent);
    const button = fixture.nativeElement.querySelector('button');
    expect(button?.textContent).toContain('Add user');
  });

  it('should open dialog on handleEditUser()', () => {
    const fixture = MockRender(UsersDashboardComponent);
    const instance = fixture.point.componentInstance;
    instance.handleEditUser({ userId: '123' });

    expect(dialogService.open).toHaveBeenCalledWith(
      EditUserDialogComponent,
      expect.objectContaining({
        data: { userId: '123' },
        header: 'Edit User',
        width: '500px',
      })
    );
  });

  it('should open dialog on handleCreateUser()', () => {
    const fixture = MockRender(UsersDashboardComponent);
    const instance = fixture.point.componentInstance;
    instance.handleCreateUser();

    expect(dialogService.open).toHaveBeenCalledWith(
      EditUserDialogComponent,
      expect.objectContaining({
        header: 'Create User',
        width: '500px',
      })
    );
  });
});
