import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderBar } from './header-bar/header-bar';
import { NavigationSidebar } from './navigation-sidebar/navigation-sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderBar, NavigationSidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('ttrpg-companion-app');
}
