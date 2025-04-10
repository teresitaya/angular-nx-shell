import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConsts } from '@teresitaya/core';
import { ThemeService } from '@teresitaya/core';
import { Subject, takeUntil } from 'rxjs';
import { CardModule } from 'primeng/card';
import { DashboardToolbarComponent } from '../dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, CardModule, DashboardToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private readonly _themeService = inject(ThemeService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroy$ = new Subject<void>();

  title = UserConsts.USER_ID + ' Dashboard';
  currentTheme = this._themeService.getCurrentTheme();

  ngOnInit(): void {
    this._themeService.theme$
      .pipe(takeUntil(this._destroy$))
      .subscribe((theme) => {
        this.currentTheme = theme;
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
