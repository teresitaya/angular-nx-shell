import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-layout',
  imports: [RouterLink, ButtonModule, CardModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedPrefersColorScheme = localStorage.getItem('prefers-color-scheme');
    if (savedPrefersColorScheme === 'dark') {
      this.isDarkMode = true;
    } else if (savedPrefersColorScheme === 'light') {
      this.isDarkMode = false;
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.toggleDarkMode(this.isDarkMode);
  }

  toggleDarkMode(isDark: boolean) {
    const element = document.querySelector('html');
    if (element) {
      const toggleClass = isDark ? 'my-app-dark' : 'my-app-light';
      element.classList.remove(isDark ? 'my-app-light' : 'my-app-dark');
      element.classList.add(toggleClass);
      localStorage.setItem('prefers-color-scheme', isDark ? 'dark' : 'light');
      this.isDarkMode = isDark;
    }
  }
}
