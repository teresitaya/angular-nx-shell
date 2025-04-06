import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};

    // Mock localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key: string) => mockLocalStorage[key] || null,
        setItem: (key: string, value: string) => {
          mockLocalStorage[key] = value;
        },
      },
      configurable: true
    });

    // Mock document methods
    document.documentElement.classList.remove = jest.fn();
    document.documentElement.classList.add = jest.fn();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThemeService]
    });
  });

  it('should be created', () => {
    // Mock matchMedia for light theme
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
      }),
      configurable: true
    });
    service = TestBed.inject(ThemeService);
    expect(service).toBeTruthy();
  });

  it('should initialize with system preference when no theme is saved', () => {
    // Mock matchMedia for dark theme
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockReturnValue({
        matches: true,
        addEventListener: jest.fn(),
      }),
      configurable: true
    });
    service = TestBed.inject(ThemeService);
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should use saved theme from localStorage when available', () => {
    // Mock matchMedia for light theme
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
      }),
      configurable: true
    });
    mockLocalStorage['theme'] = 'light';
    service = TestBed.inject(ThemeService);
    expect(service.getCurrentTheme()).toBe('light');
  });

  it('should toggle theme correctly', () => {
    // Mock matchMedia for light theme
    Object.defineProperty(window, 'matchMedia', {
      value: jest.fn().mockReturnValue({
        matches: false,
        addEventListener: jest.fn(),
      }),
      configurable: true
    });
    service = TestBed.inject(ThemeService);
    service.setTheme('light');
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('dark');
    service.toggleTheme();
    expect(service.getCurrentTheme()).toBe('light');
  });
});
