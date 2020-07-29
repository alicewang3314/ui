import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { TfsService } from 'src/app/services';

@Component({
  selector: 'app-team-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  teamTasks: MatTableDataSource<any>;
  teamResources: any[];
  displayedColumns: string[] = [
    'id',
    'title',
    'assignedTo',
    'state',
    'originalEstimate',
    'completedWork',
    'remainingWork'
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatSort, { static: true }) sortResources: MatSort;
  title: string;
  iterationType: string;
  iterationData: any;

  constructor(
    private route: ActivatedRoute,
    private tfs: TfsService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(q => {
      const current = q['current'];

      this.route.paramMap.subscribe(params => {
        this.tfs.getSetting().subscribe((setting: any) => {

          if (current === '1') {
            this.tfs.getCurrent(setting.tfsProjTeams).subscribe(report => {
              this.iterationType = 'Current Iteration';
              this.getDataFromIterationReport(report, params);
            });
          } else {
            this.tfs.getAll(setting.tfsProjTeams).subscribe(report => {
              this.iterationType = 'All Pending';
              this.getDataFromIterationReport(report, params);
            });
          }
        })
      })
    });
  }

  applyFilter(filterValue: string) {
    this.teamTasks.filter = filterValue.trim().toLowerCase();
  }

  getDataFromIterationReport(report: any, params: ParamMap) {
    this.title = params.get('title');
    const team = report.teams.find(team => team.title === this.title);
    this.teamTasks = new MatTableDataSource(team.currentTasks);
    this.teamTasks.sort = this.sortResources;
    this.teamResources = team.resourcesStats;
    this.iterationData = team.iteration;
  }

  back() {
    this.location.back();
  }
}
