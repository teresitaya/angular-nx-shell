import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '@teresitaya/core';
import { ComingSoonComponent } from '@teresitaya/ui';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('@teresitaya/dashboard').then((m) => m.DashboardComponent),
      },
      {
        path: 'agents',
        component: ComingSoonComponent
      },
      {
        path: 'policies',
        component: ComingSoonComponent
      },
      {
        path: 'integrations',
        component: ComingSoonComponent
      },  
    ],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@teresitaya/account').then((m) => m.AccountComponent),
  },
  {
    path:'*',
    redirectTo: 'dashboard'
  }
];
