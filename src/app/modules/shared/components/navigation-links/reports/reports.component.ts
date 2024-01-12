import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss', '../../sidebar/sidebar.component.scss']
})
export class ReportsComponent implements OnInit {

  showAdvocateReports = false;
  showMarketingReports = false;
  showMedicalReports = false;
  showMonthlyReports = false;

  constructor() { }

  ngOnInit(): void {
  }

}
