import { Component, OnInit } from '@angular/core';
import { NavigationLink } from 'src/app/models/common/navigation-links/navigation-link.model';
import { medicalNavigationLinks } from '../../utils/reports/medical-navigation-links';

@Component({
  selector: 'app-medical-reports',
  templateUrl: './medical-reports.component.html',
  styleUrls: ['./medical-reports.component.scss']
})
export class MedicalReportsComponent implements OnInit {

  navigationLinks: NavigationLink[] = medicalNavigationLinks;

  constructor() { }

  ngOnInit(): void {
  }

}
