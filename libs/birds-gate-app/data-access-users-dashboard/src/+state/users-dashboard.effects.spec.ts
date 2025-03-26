import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UsersDashboardEffects } from './users-dashboard.effects';

describe('UsersDashboardEffects', () => {
  let actions$: Observable<any>;
  let effects: UsersDashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersDashboardEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UsersDashboardEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
