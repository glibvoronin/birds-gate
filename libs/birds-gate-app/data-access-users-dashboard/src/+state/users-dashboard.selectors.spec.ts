import * as fromUsersDashboard from './users-dashboard.reducer';
import { selectUsersDashboardState } from './users-dashboard.selectors';

describe('UsersDashboard Selectors', () => {
  it('should select the feature state', () => {
    const result = selectUsersDashboardState({
      [fromUsersDashboard.usersDashboardFeatureKey]: {}
    });

    expect(result).toEqual({});
  });
});
