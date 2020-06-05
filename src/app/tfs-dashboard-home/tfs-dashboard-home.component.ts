import { Component, OnInit, Output } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subject, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { CacheService } from "../services/cache.service";
import { environment } from "src/environments/environment";
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from "@angular/forms";
import { EventEmitter } from "events";
import { temporaryDeclaration } from "@angular/compiler/src/compiler_util/expression_converter";
export class Project {
  Name: string;
  Value: string;
}

@Component({
  selector: 'app-tfs-dashboard-home',
  templateUrl: './tfs-dashboard-home.component.html',
  styleUrls: ['./tfs-dashboard-home.component.css']
})
export class TfsDashboardHomeComponent implements OnInit {

  form: FormGroup;
  projectsData = [];
  newdata = [];
  stream = new BehaviorSubject({});
  Tasks = this.stream.asObservable();
  showSpinner: boolean = false;
  private baseUrl = environment.baseUrl;
  panelOpenState:boolean = false;
  showDiv:boolean=false;  
  message:string='Please select a project.';
  actionButtonLabel: string = '';
  action: boolean = true;
  searchText: string;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public cacheService: CacheService,
    public snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      projects: new FormArray([], minSelectedCheckboxes(1))
    });
  }
  ngOnInit() {
    this.getAllProjects().subscribe(x => {
      x.map((item, index) => {
        //index === 0 ? (item["isChecked"] = true) : (item["isChecked"] = false);
        this.projectsData.push(item);
      });
      this.addCheckBoxes();
    });
    //this.showSpinner = false;
    if (this.cacheService.checkedList==null){
      this.panelOpenState=true;
    }
    else{
      this.panelOpenState=false;
    }   
  }
  addCheckBoxes() {
    if (this.cacheService.checkedList != undefined) {
      this.projectsData.map(item => {
        this.cacheService.checkedList.map(childItem => {
          if (item.value === childItem.value) {
            item["isChecked"] = childItem.isChecked;
          }
        });
      });
    }
    this.cacheService.checkedList = this.projectsData;
  }

  getAllProjects(): Observable<Project[]> {
    let url = this.baseUrl + "/api/Iteration/GetProjectList";
    return this.http.get<Project[]>(url);
  }
  submit() {
    this.getProjectTasks();
    
  }
  getProjectTasks() {   
    var isSelected: any;
    this.cacheService.checkedList.map(item => {
      if (item.isChecked) {
        isSelected = true;
      }
    });
    if (isSelected == true) {
      this.showDiv=false;
    } else {     
      this.showDiv=true;
      return;
    }
    this.newdata = [];
    this.cacheService.checkedList.map((item: { isChecked: any }) => {
      if (item.isChecked) {
        this.newdata.push(item);
      }
    });
    this.panelOpenState=false;
    //console.log(this.newdata);
    this.cacheService.data = this.newdata;
    this.stream.next(this.newdata);
    // this.router.navigate(["tfs/tfsboard"]);
  }

}
function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => (next ? prev + next : prev), 0);
    return totalSelected >= min ? null : { required: true };
  };
  return validator;
}
