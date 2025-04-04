import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'lib-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
readonly title = input<string>('');

}
