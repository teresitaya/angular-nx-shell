import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _themeSubject: BehaviorSubject<Theme>;
  theme$: BehaviorSubject<Theme>;

  constructor() {
    const initialTheme = this.getInitialTheme();
    this._themeSubject = new BehaviorSubject<Theme>(initialTheme);
    this.theme$ = this._themeSubject;
    
    // Apply initial theme
    this.applyTheme(initialTheme);

    // Listen to system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        this.setTheme(newTheme);
      }
    });
  }

  private getInitialTheme(): Theme {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    const theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    this.setTheme(theme);
    return theme;
  }

  private applyTheme(theme: Theme): void {
    const classPrefix = 'my-app';
    document.documentElement.classList.remove(`${classPrefix}-light`, `${classPrefix}-dark`);
    document.documentElement.classList.add(`${classPrefix}-${theme}`);
  }

  getCurrentTheme(): Theme {
    return this._themeSubject.value;
  }

  setTheme(theme: Theme): void {
    localStorage.setItem('theme', theme);
    this._themeSubject.next(theme);
    this.applyTheme(theme);
  }

  toggleTheme(): void {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}
