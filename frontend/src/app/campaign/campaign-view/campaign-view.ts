import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-campaign-view',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './campaign-view.html',
  styleUrl: './campaign-view.css',
})
export class CampaignView {
  title = 'Campaign';
}
