import { NavigationLink } from "src/app/models/common/navigation-links/navigation-link.model";

export const medicalNavigationLinks: NavigationLink[] = [
  {
    title: 'Complication Stats',
    router: '/reports/complication-stats',
    icon: 'fa fa-bar-chart'
  },
  {
    title: 'Complications',
    router: '/reports/complications',
    icon: 'fa fa-exclamation'
  },
  {
    title: 'Readmissions',
    router: '/reports/readmissions',
    icon: 'fa fa-undo'
  },
  {
    title: 'Long Hospital Stays',
    router: '/reports/long-hospital-stays',
    icon: 'fa fa-hospital-o'
  },
];
