import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@teresitaya/ui';

@Component({
  selector: 'lib-account',
  imports: [CommonModule, CardComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {}
