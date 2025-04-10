import { AfterViewInit, ChangeDetectorRef, Component, effect, inject, Injector, OnDestroy, OnInit, runInInjectionContext, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeframeOption, UserConsts } from '@teresitaya/core';
import { ThemeService } from '@teresitaya/core';
import { Subject, takeUntil } from 'rxjs';
import { CardModule } from 'primeng/card';
import { DashboardToolbarComponent } from '../dashboard-toolbar/dashboard-toolbar.component';
import { DashboardWidgetsComponent } from '../dashboard-widgets/dashboard-widgets.component';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, CardModule, DashboardToolbarComponent, DashboardWidgetsComponent],
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly _themeService = inject(ThemeService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _injector = inject(Injector);
  private readonly _destroy$ = new Subject<void>();
  @ViewChild(DashboardToolbarComponent) dashboardToolbar!: DashboardToolbarComponent;

  title = UserConsts.USER_ID + ' Dashboard';
  currentTheme = this._themeService.getCurrentTheme();
  
  // Store the current search and timeframe values
  currentSearch = '';
  currentTimeframe: TimeframeOption | null = null;

  ngOnInit(): void {
    this._themeService.theme$
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme) => {
        this.currentTheme = theme;
        this._cdr.detectChanges();
      });
      
  }
  
  ngAfterViewInit(): void {
    // Create an effect to react to search query changes
    runInInjectionContext(this._injector, () => {
      effect(() => {
        if (this.dashboardToolbar) {
          this.currentSearch = this.dashboardToolbar.searchQuery();
          console.log('Search query changed:', this.currentSearch);
          // Here you would typically filter data or make API calls based on the search
          this._cdr.detectChanges();
        }
      });
    });
    
    // Create an effect to react to timeframe changes
    runInInjectionContext(this._injector, () => {
      effect(() => {
        if (this.dashboardToolbar) {
          this.currentTimeframe = this.dashboardToolbar.timeframe();
          console.log('Timeframe changed:', this.currentTimeframe?.label);
          // Here you would typically filter data by date range or make API calls
          this._cdr.detectChanges();
        }
      });
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
