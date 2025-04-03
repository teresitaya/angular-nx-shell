import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@teresitaya/ui';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
