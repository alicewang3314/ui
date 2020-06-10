import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
// import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tfs-reports";
  mode = new FormControl('over');
  pagesWithSetting = ['tfs-dashboard'];

  constructor(private router: Router) { }

  get hasSetting(): boolean {
    let path =  this.router.url;
    path = path.startsWith('/') ? path.substring(1) : path;
    const pathArr = path.split('/');
    return this.pagesWithSetting.indexOf(pathArr[0]) !== -1;
  }

  getSetting(): void {

  }
}
