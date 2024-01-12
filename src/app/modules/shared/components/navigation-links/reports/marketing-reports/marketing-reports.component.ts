import { Component, OnInit } from '@angular/core';
import { marketingNavigationLinks } from '../../utils/reports/marketing-navigation-links';
import { NavigationLink } from 'src/app/models/common/navigation-links/navigation-link.model';

@Component({
  selector: 'app-marketing-reports',
  templateUrl: './marketing-reports.component.html',
  styleUrls: ['./marketing-reports.component.scss']
})
export class MarketingReportsComponent implements OnInit {

  navigationLinks: NavigationLink[] = marketingNavigationLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
