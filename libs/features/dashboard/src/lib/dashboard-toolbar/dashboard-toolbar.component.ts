import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { SelectModule } from 'primeng/select';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimeframeOption } from '@teresitaya/core';


@Component({
  selector: 'lib-dashboard-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule,
    SelectModule,
    ToggleSwitchModule
  ],
  templateUrl: './dashboard-toolbar.component.html',
  styles: []
})
export class DashboardToolbarComponent implements OnInit, OnDestroy {
  filterForm!: FormGroup;
  timeframeOptions: TimeframeOption[] = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' }
  ];
  
  // Signals for form values
  public searchQuery = signal<string>('');
  public timeframe = signal<TimeframeOption | null>(null);
  
  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();
  
  private readonly _fb = inject(FormBuilder);
  
  ngOnInit() {
    this.filterForm = this._fb.group({
      searchQuery: new FormControl<string>(''),
      timeframeSelect: new FormControl<TimeframeOption | null>(null),
      applyTimeframe: new FormControl<boolean>(false)
    });
    
   this.filterForm.get('searchQuery')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log('Search query:', value);
        this.searchQuery.set(value || '');
      });
    // Subscribe to applyTimeframe changes to enable/disable timeframeSelect
    this.filterForm.get('applyTimeframe')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        if (value) {
          this.filterForm.get('timeframeSelect')?.enable();
          this.filterForm.get('timeframeSelect')?.setValue(this.timeframeOptions[1]);
        } else {
          this.filterForm.get('timeframeSelect')?.disable();
          this.filterForm.get('timeframeSelect')?.reset();
        }
        
        // Update timeframe signal based on toggle state
        if (!value) {
          this.timeframe.set(null); // No timeframe applied
        } else {
          this.timeframe.set(this.filterForm.get('timeframeSelect')?.value);
        }
      });

    this.filterForm.get('timeframeSelect')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        console.log('Timeframe selected:', value?.value);
        
        // Only update timeframe signal if timeframe is applied
        if (this.filterForm.get('applyTimeframe')?.value) {
          this.timeframe.set(value);
        }
      });
  }
  
  ngOnDestroy(): void {
    // Clean up subscriptions
    this.destroy$.next();
    this.destroy$.complete();
    
    // Signals don't need explicit cleanup
  }
}
