import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('@teresitaya/account').then((m) => m.AccountComponent),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@teresitaya/dashboard').then((m) => m.DashboardComponent),
      },
];
