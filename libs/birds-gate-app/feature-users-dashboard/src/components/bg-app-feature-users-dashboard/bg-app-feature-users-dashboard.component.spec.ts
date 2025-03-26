import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BgAppFeatureUsersDashboardComponent } from './bg-app-feature-users-dashboard.component';

describe('BgAppFeatureUsersDashboardComponent', () => {
  let component: BgAppFeatureUsersDashboardComponent;
  let fixture: ComponentFixture<BgAppFeatureUsersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BgAppFeatureUsersDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BgAppFeatureUsersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
