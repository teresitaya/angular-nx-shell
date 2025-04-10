import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService, ThemeService, NotificationsStateService } from '@teresitaya/core';
import { filter, Subscription } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
    TooltipModule,
    OverlayBadgeModule,
  ],
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly _notificationsService = inject(NotificationsStateService);
  
  readonly hasUnreadNotifications = this._notificationsService.hasUnread;
  readonly unreadCount = this._notificationsService.unreadCount;
  
  isDarkMode = false;
  isMobile = false;
  mobileMenuVisible = false;
  
  links = [
    { label: 'Dashboard', link: '/dashboard', active: true, hover: false },
    { label: 'Agents and Apps', link: '/agents', active: false, hover: false },
    { label: 'Policy Catalog', link: '/policies', active: false, hover: false },
    { label: 'Integrations', link: '/integrations', active: false, hover: false },
  ];
  items: MenuItem[] | undefined;

  private readonly _themeService = inject(ThemeService);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);

  private readonly _subscription = new Subscription();

  ngOnInit(): void {
    this.isDarkMode = this._themeService.getCurrentTheme() === 'dark';
    this._themeService.theme$.subscribe((theme) => {
      this.isDarkMode = theme === 'dark';
    });
    // Set initial active state
    this.updateActiveLink(this._router.url);

    // Subscribe to route changes
    this._subscription.add(
      this._router.events
        .pipe(
          filter((event): event is NavigationEnd => event instanceof NavigationEnd)
        )
        .subscribe((event) => {
          this.updateActiveLink(event.url);
          // Close mobile menu on navigation
          this.mobileMenuVisible = false;
        })
    );
    
    this.items = [
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
    ];
    
    // Check initial screen size
    this.checkScreenSize();
    
    // Listen for window resize events
    window.addEventListener('resize', this.onResize.bind(this));
    this._subscription.add({
      unsubscribe: () => {
        window.removeEventListener('resize', this.onResize.bind(this));
      }
    });
  }

  toggleDarkMode() {
    this._themeService.toggleTheme();
  }

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // md breakpoint in Tailwind is 768px
  }

  private onResize() {
    this.checkScreenSize();
    // Auto-close mobile menu on resize to desktop
    if (!this.isMobile) {
      this.mobileMenuVisible = false;
    }
  }

  private updateActiveLink(currentUrl: string) {
    this.links = this.links.map((link) => ({
      ...link,
      active: currentUrl.startsWith(link.link) && link.link !== '/' || currentUrl === link.link,
      hover: false
    }));
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
