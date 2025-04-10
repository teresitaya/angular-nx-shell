import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardToolbarComponent } from './dashboard-toolbar.component';

describe('DashboardToolbarComponent', () => {
  let component: DashboardToolbarComponent;
  let fixture: ComponentFixture<DashboardToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardToolbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
