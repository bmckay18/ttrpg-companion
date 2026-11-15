import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { HeaderBarDatasourceService } from './services/header-bar-datasource-service';

@Component({
  selector: 'app-header-bar',
  imports: [],
  templateUrl: './header-bar.html',
  styleUrl: './header-bar.css',
})
export class HeaderBar implements OnInit {
  private datasource = inject(HeaderBarDatasourceService);
  private cdr = inject(ChangeDetectorRef);
  
  displayName = signal('');

  ngOnInit() {
    this.datasource.getDisplayName().subscribe({
      next: (name) => {
        this.displayName.set(name);
        console.log(name);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
