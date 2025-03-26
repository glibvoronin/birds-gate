import { TestBed } from '@angular/core/testing';

import { UsersDashboardService } from './users-dashboard.service';

describe('UsersDashboardService', () => {
  let service: UsersDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsersDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
