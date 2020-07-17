import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pagesWithSetting = ['tfs-dashboard'];
  currentRoute = '/error-logs-dashboard';

  constructor(private router: Router) {

    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.url === '/' ? '/error-logs-dashboard' : ev.url;
      };
    })
  }

  isActive(url: string): string {
    return url === this.currentRoute ? 'active' : '';
  }
}
