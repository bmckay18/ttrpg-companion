import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBar } from '../header-bar/header-bar';
import { NavigationSidebar } from '../navigation-sidebar/navigation-sidebar';

@Component({
  selector: 'app-base-internal',
  imports: [RouterOutlet, HeaderBar, NavigationSidebar],
  templateUrl: './base-internal.html',
  styleUrl: './base-internal.css',
})
export class BaseInternal {}
