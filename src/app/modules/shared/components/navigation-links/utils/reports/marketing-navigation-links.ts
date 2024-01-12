import { NavigationLink } from "src/app/models/common/navigation-links/navigation-link.model";

export const marketingNavigationLinks: NavigationLink[] = [
  {
    title: 'Surgical Hx',
    router: '/reports/surgical-hx',
    icon: 'fa fa-list-alt'
  },
  {
    title: 'Employer Stats',
    router: '/reports/employer-stats',
    icon: 'fa fa-bar-chart'
  },
  {
    title: 'Employer Search',
    router: '/reports/patients-by-employer',
    icon: 'fa fa-search'
  },
];
