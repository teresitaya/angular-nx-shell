import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '@teresitaya/ui';
import { UserConsts } from '@teresitaya/core';

@Component({
  selector: 'lib-account',
  imports: [CommonModule, CardComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  title = UserConsts.USER_ID + ' Account';

}
