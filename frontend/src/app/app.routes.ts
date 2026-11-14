import { Routes } from '@angular/router';
import { Campaign } from './campaign/campaign';
import { CampaignView } from './campaign/campaign-view/campaign-view';
import { CombatTracker } from './campaign/campaign-view/combat-tracker/combat-tracker';
import { Login } from './login/login';
import { BaseInternal } from './base-internal/base-internal';
import { authGuard } from './core/guards/auth-guard-guard';

export const routes: Routes = [
  {
    path: 'auth',
    component: Login
  },
  {
    path: 'app',
    component: BaseInternal,
    canActivate: [authGuard],
    children: [
      {
        path: 'campaigns',
        component: Campaign,
      },
      {
        path: 'campaigns/:id',
        component: CampaignView,
        children: [
          {
            path: 'combat',
            component: CombatTracker,
          },
          {
            path: '',
            redirectTo: 'combat',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: '',
        redirectTo: 'campaigns',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];
