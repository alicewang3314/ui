import { Component } from "@angular/core";
import { FormControl } from '@angular/forms';
// import { SESSION_STORAGE, WebStorageService } from "angular-webstorage-service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "tfs-reports";
  mode = new FormControl('over');
}
