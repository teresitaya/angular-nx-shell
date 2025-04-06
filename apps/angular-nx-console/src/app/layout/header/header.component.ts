import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { ThemeService } from '@teresitaya/core';
import { Subscription } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    AvatarModule,
    AvatarGroupModule,
    BadgeModule,
    OverlayBadgeModule,
    TooltipModule,
  ],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  links = [
    { label: 'Dashboard', link: '/dashboard', active: true },
    { label: 'Agents and Apps', link: '/agents', active: false },
    { label: 'Policy Catalog', link: '/policies', active: false },
    { label: 'Integrations', link: '/integrations', active: false },
  ];

  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);

  private readonly _subscription = new Subscription();

  ngOnInit(): void {
    this.isDarkMode = this._themeService.getCurrentTheme() === 'dark';
    this._themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
    this._subscription.add(
      this._router.events.subscribe(() => {
        this.links = this.links.map((link) => ({
          ...link,
          active: link.link === this._router.url,
        }));
      })
    );
  }

  toggleDarkMode() {
    this._themeService.toggleTheme();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
