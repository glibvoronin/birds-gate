import { AppComponent } from './app.component';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { RouterOutlet } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(() => {
    return MockBuilder(AppComponent);
  });

  it('should render the component', () => {
    const fixture = MockRender(AppComponent);
    expect(fixture.point.componentInstance).toBeInstanceOf(AppComponent);
  });

  it('should contain a router-outlet', () => {
    MockRender(AppComponent);
    const outlet = ngMocks.findInstance(RouterOutlet);
    expect(outlet).toBeDefined();
  });
});
