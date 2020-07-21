import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faBug, faHome, faChartLine, faTasks, faFileExcel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pagesWithSetting = ['tfs-dashboard'];
  currentRoute = '/error-logs-dashboard';
  // icons
  bugIcon = faBug;
  homeIcon = faHome;
  reportIcon = faFileExcel;
  logIcon = faChartLine;
  tfsTasksIcon = faTasks;


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
