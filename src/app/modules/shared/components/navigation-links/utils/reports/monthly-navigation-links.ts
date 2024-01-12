import { NavigationLink } from "src/app/models/common/navigation-links/navigation-link.model";

export const monthlyNavigationLinks: NavigationLink[] = [
  {
    title: 'Pull-Through',
    router: '/reports/pull-through',
    icon: 'fa fa-filter'
  },
  {
    title: 'Surgical Summary',
    router: '/reports/surgical-summary',
    icon: 'fa fa-table'
  },
  {
    title: 'Bariatric Surgeries',
    router: '/reports/case-log-summary',
    icon: 'fa fa-bars'
  },
  {
    title: 'Appointments Summary',
    router: '/reports/appointments',
    icon: 'fa fa-list'
  },
  {
    title: 'Leads by Payer',
    router: '/reports/leads-by-payer',
    icon: 'fa fa-money'
  },
  {
    title: 'Monthly Numbers',
    router: '/reports/monthly-stats',
    icon: 'fa fa-table'
  },
];
