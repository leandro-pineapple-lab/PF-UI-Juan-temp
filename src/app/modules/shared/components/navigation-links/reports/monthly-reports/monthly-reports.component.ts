import { Component, OnInit } from '@angular/core';
import { monthlyNavigationLinks } from '../../utils/reports/monthly-navigation-links';

@Component({
  selector: 'app-monthly-reports',
  templateUrl: './monthly-reports.component.html',
  styleUrls: ['./monthly-reports.component.scss']
})
export class MonthlyReportsComponent implements OnInit {

  navigationLinks = monthlyNavigationLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
