import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', '../../sidebar/sidebar.component.scss']
})
export class SettingsComponent implements OnInit {

  showPracticeSettings: boolean = false;
  showEducationalMaterialSettings: boolean = false;
  showEventsSettings: boolean = false;
  showReferralsSettings: boolean = false;
  showTemplateSettings: boolean = false;
  showUserSettings: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
