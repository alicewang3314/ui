import { Component, OnInit, Input } from '@angular/core';
import { SettingService } from 'src/app/services/setting.service';
import { Settings } from 'src/app/types';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CacheService } from 'src/app/services/cache.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tfs-dashboard-settings',
  templateUrl: './tfs-dashboard-settings.component.html',
  styleUrls: ['./tfs-dashboard-settings.component.css'],
})
export class TfsDashboardSettingsComponent implements OnInit {
  @Input() settingClosed: Observable<void>;

  tfsprojectK: any;
  savedValues: {} | undefined;
  projects: Project[] = [];


  constructor(
    private settingService: SettingService,
    private cacheService: CacheService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.settingService.getProjectsFromTFS().subscribe(
      resp => {
        this.tfsprojectK = resp;

        this.settingService.getProjectsTeamsFromDb().subscribe(
          resp => {
            if (resp) {
              this.savedValues = JSON.parse(resp.tfsProjTeams);
            }

            for (const proj in this.tfsprojectK) {

              if (this.tfsprojectK.hasOwnProperty(proj)) {

                const element = this.tfsprojectK[proj];

                let project: Project = {
                  id: element.id,
                  name: element.name,
                  teams: element.teams.map(
                    (t: Team) => {
                      return {
                        id: t.id,
                        name: t.name,
                        selected: this.GetIsSelected(element.name, t.name)
                      }
                    }
                  )
                }
                this.projects.push(project);
              }
            }
          }
        );
      }
    );

    this.settingClosed.subscribe(() => this.save());
  }

  save() {
    let selectedProjsTeams = {};
    this.projects.forEach(project => {
      project.teams.forEach(team => {
        if (team.selected) {
          if (!selectedProjsTeams[project.name]) {
            selectedProjsTeams[project.name] = [];
          }
          selectedProjsTeams[project.name].push(team.name);
        }
      });
    });

    //call update settings
    //let settings: Settings = { name: environment.TFSDashBSetting, value: JSON.stringify(selectedProjsTeams) }
    let settings: Settings = { tfsProjTeams: JSON.stringify(selectedProjsTeams) }

    if (this.savedValues) {
      this.settingService.updateSettings(settings).subscribe(
        resp => {
          if (resp == 1) {
            this.matSnackBar.open("Settings Saved", null, { duration: 3000, horizontalPosition: 'left' });
            this.savedValues = settings.tfsProjTeams;
            this.settingService.clearCache();
            this.cacheService.clearCache();
            window.location.reload();
          }
          else {
            this.matSnackBar.open("Error in updating settings", null, { duration: 3000, horizontalPosition: 'left' });
          }

        }
      );
    }
    else {
      this.settingService.addSettings(settings).subscribe(
        resp => {
          if (resp == 1) {
            this.matSnackBar.open("Settings Added", null, { duration: 3000, horizontalPosition: 'left' });
            this.settingService.clearCache();
            this.cacheService.clearCache();
            window.location.reload();
          }
          else {
            this.matSnackBar.open("Error in adding settings", null, { duration: 3000, horizontalPosition: 'left' });
          }
        }
      );
    }
  }

  private GetIsSelected(projName, teamName): boolean {
    if (!this.savedValues) {
      return
    }

    if (this.savedValues.hasOwnProperty(projName)) {

      const element: string[] = this.savedValues[projName];

      if (element.indexOf(teamName) > -1) {
        return true;
      }
    }

    return false;
  }
}

export interface Project {
  name?: string | undefined;
  id: string | undefined;
  teams?: Team[] | undefined;
}

export interface Team {
  name?: string | undefined;
  id: string;
  value: string | undefined;
  selected?: boolean | false;
}

