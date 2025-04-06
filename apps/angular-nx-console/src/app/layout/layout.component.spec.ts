import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { LayoutComponent } from './layout.component';
import { ThemeService } from '@teresitaya/core';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let themeService: ThemeService;

  beforeEach(async () => {
    // Mock matchMedia if not already defined
    if (!window.matchMedia) {
      Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
    }

    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        RouterModule.forRoot([]),
        ButtonModule,
        CardModule
      ],
      providers: [ThemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    themeService = TestBed.inject(ThemeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with light theme by default', () => {
    expect(themeService.getCurrentTheme()).toBe('light');
  });
});
