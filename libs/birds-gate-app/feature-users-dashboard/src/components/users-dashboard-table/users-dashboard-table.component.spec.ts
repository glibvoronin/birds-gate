import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersDashboardTableComponent } from './users-dashboard-table.component';

describe('UsersDashboardTableComponent', () => {
  let component: UsersDashboardTableComponent;
  let fixture: ComponentFixture<UsersDashboardTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDashboardTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersDashboardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
