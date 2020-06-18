import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
// import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
import { faCog } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tfs-reports";
  mode = new FormControl('over');
  pagesWithSetting = ['tfs-dashboard'];
  path: string;
  cogIcon = faCog;
  currentRoute = '/error-logs-dashboard';

  constructor(private router: Router) {
    router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this.currentRoute = ev.url === '/' ? '/error-logs-dashboard' : ev.url;
      };
    })
  }

  get hasSetting(): boolean {
    let path = this.router.url;
    path = path.startsWith('/') ? path.substring(1) : path;
    this.path = path.split('/')[0];

    return this.pagesWithSetting.indexOf(this.path) !== -1;
  }

  isActive(url: string): string {
    return url === this.currentRoute ? 'active' : '';
  }

  public getSetting(): void {
    this.router.navigate([this.path + '/settings']);
  }
}
