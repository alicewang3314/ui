import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Settings } from 'src/app/types';
import { TfsService } from '../../services/tfs.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-tfs-dashboard-settings',
  templateUrl: './tfs-dashboard-settings.component.html',
  styleUrls: ['./tfs-dashboard-settings.component.css'],
})
export class TfsDashboardSettingsComponent implements OnInit {
  @Input() settingClosed: Observable<void>;
  tfsProject: any;
  savedSetting: Object;
  projects: Project[] = [];

  constructor(
    private message: MessageService,
    private tfs: TfsService) { }

  ngOnInit(): void {
    this.tfs.getProjects().subscribe(allProjects => {
      this.tfsProject = allProjects;

      this.tfs.getSetting().subscribe((setting: any) => {
        this.savedSetting = setting ? JSON.parse(setting.tfsProjTeams) : undefined;

        Object.values(this.tfsProject).forEach((project: any) => {
          const { name, teams } = project;
          const selectedTeams = !!this.savedSetting && this.savedSetting[name];

          if (!selectedTeams) {
            this.projects.push(project);
            return;
          }

          const teamsWithSelected = teams.map(team =>
            selectedTeams.indexOf(team.name) > -1
              ? {
                ...team,
                selected: true,
              }
              : team
          );

          this.projects.push({
            ...project,
            teams: teamsWithSelected,
          });
        });
      });
    });

    this.settingClosed.subscribe(() => this.save());
  }

  getSelectedProjsTeams() {
    const selectedProjsTeams = {};

    this.projects.forEach(project => {
      const { name: projectName, teams } = project;

      teams.forEach(team => {
        const { selected, name: teamName } = team;

        if (selected) {
          if (!selectedProjsTeams[projectName]) {
            selectedProjsTeams[projectName] = [];
          }
          selectedProjsTeams[projectName].push(teamName);
        }
      });
    });

    return selectedProjsTeams;
  }

  save() {
    const selectedProjsTeams = this.getSelectedProjsTeams();

    if (JSON.stringify(this.savedSetting) !== JSON.stringify(selectedProjsTeams)) {

      const newSettings: Settings = { tfsProjTeams: JSON.stringify(selectedProjsTeams) };

      if (this.savedSetting) {
        this.updateSetting(newSettings);
      } else {
        this.createSetting(newSettings);
      }
    }
  }

  updateSetting(newSettings) {
    this.tfs.updateSetting(newSettings).subscribe(resp => {
      if (resp === 1) {
        this.message.message('Settings Saved');
      } else {
        this.message.message('Error in updating settings');
      }
    });
  }

  createSetting(newSettings) {
    this.tfs.createSetting(newSettings).subscribe(
      resp => {
        if (resp === 1) {
          this.message.message('Settings Added');
        } else {
          this.message.message('Error in adding settings');
        }
      }
    );
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

