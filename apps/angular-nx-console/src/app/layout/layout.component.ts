import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, HeaderComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styles: [],
})
export class LayoutComponent {}