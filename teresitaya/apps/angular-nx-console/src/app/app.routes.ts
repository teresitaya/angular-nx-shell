import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
    {
        path: '',
        component: NxWelcomeComponent,
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
