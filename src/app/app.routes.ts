import { Routes } from '@angular/router';
import { Campaign } from './campaign/campaign';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'campaigns',
        pathMatch: 'full'
    },
    {
        path: 'campaigns',
        component: Campaign
    }
];
