import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ThemeService } from '@teresitaya/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  isDarkMode = false;

  private readonly _themeService = inject(ThemeService);

  ngOnInit(): void {
    this.isDarkMode = this._themeService.getCurrentTheme() === 'dark';
    this._themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
  }

  toggleDarkMode() {
    this._themeService.toggleTheme();
    this.isDarkMode = !this.isDarkMode;
  }
}
