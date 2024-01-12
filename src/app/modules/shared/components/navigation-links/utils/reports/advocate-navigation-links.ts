import { NavigationLink } from "src/app/models/common/navigation-links/navigation-link.model";

export const AdvocateNavigationLinks: NavigationLink[] = [
  {
    title: 'Daily Intake',
    router: '/reports/daily-intake',
    icon: 'fa fa-calendar'
  },
  {
    title: 'Homework Status',
    router: '/reports/homework-status',
    icon: 'fa fa-user'
  },
  {
    title: 'Duplicates',
    router: '/reports/duplicated-intakes',
    icon: 'fa fa-clone'
  },
  {
    title: 'Completed Homework',
    router: '/reports/completed-homeworks',
    icon: 'fa fa-check'
  },
  {
    title: 'Initial Consults',
    router: '/reports/initial-consults',
    icon: 'fa fa-user-md'
  },
  {
    title: 'Pre-Op',
    router: '/reports/pre-op',
    icon: 'fa fa-plus-square'
  },
  {
    title: 'Clearance Visits',
    router: '/reports/clearance-visits',
    icon: 'fa fa-medkit'
  },
  {
    title: 'Insurance Verification',
    router: '/reports/insurance-verification',
    icon: 'fa fa-check'
  },
  {
    title: 'Patient Insurance',
    router: '/reports/patient-insurance',
    icon: 'fa fa-money'
  },
  {
    title: 'Stop Process',
    router: '/reports/stop-process',
    icon: 'fa fa-stop-circle'
  },
  {
    title: 'Prospects By Status',
    router: '/reports/prospects-by-status',
    icon: 'fa fa-info'
  },
  {
    title: 'Pre-D Letter Sent',
    router: '/reports/pre-d-letter-sent',
    icon: 'fa fa-envelope-o'
  },
  {
    title: 'Post-Op Class',
    router: '/reports/post-op-classes',
    icon: 'fa fa-university'
  },
  {
    title: 'Count By Status',
    router: '/reports/count-by-status',
    icon: 'fa fa-bar-chart'
  },
  {
    title: 'Education Status',
    router: '/reports/handout-status',
    icon: 'fa fa-book'
  },
  {
    title: 'Surgical Pipeline',
    router: '/reports/planned-surgery',
    icon: 'fa fa-history'
  },
  {
    title: 'Workflow Efficiency',
    router: '/reports/workflow-efficiency',
    icon: 'fa fa-bar-chart'
  },
  {
    title: 'Patient Data Access',
    router: '/reports/data-access',
    icon: 'fa fa-sign-in'
  },
];
