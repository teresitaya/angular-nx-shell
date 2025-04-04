import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeService } from '@teresitaya/core';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-nx-console';

  private readonly _themeService = inject(ThemeService);

  ngOnInit(): void {
    this._themeService.setTheme(this._themeService.getCurrentTheme());
  }
}