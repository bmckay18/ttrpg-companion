import { Routes } from '@angular/router';
import { Campaign } from './campaign/campaign';
import { CampaignView } from './campaign/campaign-view/campaign-view';
import { CombatTracker } from './campaign/campaign-view/combat-tracker/combat-tracker';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full',
  },
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
];
