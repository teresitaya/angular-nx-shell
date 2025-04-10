import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

interface TimeframeOption {
  label: string;
  value: string;
}

@Component({
  selector: 'lib-dashboard-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
    InputSwitchModule,
    ButtonModule,
    InputGroupModule,
    InputGroupAddonModule
  ],
  templateUrl: './dashboard-toolbar.component.html',
  styleUrl: './dashboard-toolbar.component.scss',
})
export class DashboardToolbarComponent implements OnInit {
  filterForm!: FormGroup;
  timeframeOptions: TimeframeOption[] = [
    { label: 'Last 24 hours', value: '24h' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
    { label: 'Last 90 days', value: '90d' }
  ];
  
  private readonly _fb = inject(FormBuilder);
  
  ngOnInit() {
    this.filterForm = this._fb.group({
      searchQuery: [''],
      timeframeSelect: [this.timeframeOptions[1].value], // Default to 7 days
      applyTimeframe: [true]
    });
    
   this.filterForm.get('searchQuery')?.valueChanges.subscribe(value => {
      console.log('Search query:', value);
    });
    // Subscribe to applyTimeframe changes to enable/disable timeframeSelect
    this.filterForm.get('applyTimeframe')?.valueChanges.subscribe(value => {
      if (value) {
        this.filterForm.get('timeframeSelect')?.enable();
        this.filterForm.get('timeframeSelect')?.setValue(this.timeframeOptions[1].value);
      } else {
        this.filterForm.get('timeframeSelect')?.disable();
        this.filterForm.get('timeframeSelect')?.reset();
      }
    });
  }
  
}
