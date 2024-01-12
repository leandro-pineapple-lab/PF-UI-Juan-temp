import { Component, OnInit } from '@angular/core';
import { AdvocateNavigationLinks } from '../../utils/reports/advocate-navigation-links';
import { NavigationLink } from 'src/app/models/common/navigation-links/navigation-link.model';

@Component({
  selector: 'app-advocate-reports',
  templateUrl: './advocate-reports.component.html',
  styleUrls: ['./advocate-reports.component.scss']
})
export class AdvocateReportsComponent implements OnInit {

  navigationLinks: NavigationLink[] = AdvocateNavigationLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
