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
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches || document.querySelector('html')?.classList.contains('my-app-dark') || false;
    if(this.isDarkMode){
      this.toggleDarkMode();
    }
  }

  toggleDarkMode() {
    const element = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
      this.isDarkMode = !this.isDarkMode;
    }
  }
}
