import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ThemeService, NotificationsStateService, Theme } from '@teresitaya/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { computed } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let mockThemeService: Partial<ThemeService>;
  let mockNotificationsService: Partial<NotificationsStateService>;
  let notificationsService: NotificationsStateService;

  beforeEach(async () => {
    const themeSubject = new BehaviorSubject<Theme>('light');
    mockThemeService = {
      theme$: themeSubject,
      getCurrentTheme: () => themeSubject.value,
      setTheme: (theme: Theme) => themeSubject.next(theme),
      toggleTheme: () => themeSubject.next(themeSubject.value === 'light' ? 'dark' : 'light')
    };

    mockNotificationsService = {
      notifications: computed(() => [{ id: '1', read: false, title: 'Test', message: 'Test', type: 'info', timestamp: new Date().toISOString(), category: 'system', priority: 'high' }]),
      unreadCount: computed(() => 1),
      hasUnread: computed(() => true),
      loadNotifications: jest.fn(),
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      deleteNotification: jest.fn()
    };

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
    });

    // Mock document methods
    document.documentElement.classList.remove = jest.fn();
    document.documentElement.classList.add = jest.fn();

    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent, 
        ButtonModule,
        RouterModule.forRoot([])   
      ],
      providers: [
        {
          provide: ThemeService,
          useValue: mockThemeService
        },
        {
          provide: NotificationsStateService,
          useValue: mockNotificationsService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    notificationsService = TestBed.inject(NotificationsStateService);
    expect(notificationsService).toBeTruthy();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(mockThemeService.getCurrentTheme?.()).toBe('light');
  });

  it('should display notification badge when there are unread notifications', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const badge = compiled.querySelector('.rounded-full');
    expect(badge).toBeTruthy();
    expect(badge?.textContent).toContain('1');
  });

  it('should have correct notification count', () => {
    expect(component.unreadCount()).toBe(1);
  });

  it('should indicate unread notifications correctly', () => {
    expect(component.hasUnreadNotifications()).toBe(true);
  });
});
