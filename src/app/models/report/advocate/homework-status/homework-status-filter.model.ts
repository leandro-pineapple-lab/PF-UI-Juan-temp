import { ReportParam } from "src/types/report.types";

export class HomeworkStatusReportFilterModel {
  intakeFrom: ReportParam = {
    key: 'dtif',
    description: 'Intake From',
  };
  intakeTo: ReportParam = {
    key: 'dtit',
    description: 'Intake To',
  };
  lastContactFrom: ReportParam = {
    key: 'dtcf',
    description: 'Last Contact From',
  };
  lastContactTo: ReportParam = {
    key: 'dtct',
    description: 'Last Contact To',
  };
  leadSource: ReportParam = {
    key: 'lds',
    description: 'Lead Source',
    value: ''
  };
  advocate: ReportParam = {
    key: 'adv',
    description: 'Advocate',
    value: ''
  };
  status: ReportParam = {
    key: 'stat',
    description: 'Status',
    value: ''
  };
  city: ReportParam = {
    key: 'city',
    description: 'City',
    value: ''
  };
  state: ReportParam = {
    key: 'state',
    description: 'State',
    value: ''
  };
  leadType: ReportParam = {
    key: 'ldt',
    description: 'Lead Type',
    value: ''
  };
  surgeon: ReportParam = {
    key: 'surg',
    description: 'Surgeon',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };
  plannedProcedure: ReportParam = {
    key: 'prc',
    description: 'Planned procedure',
    value: ''
  };
  interestedProcedure: ReportParam = {
    key: 'prc',
    description: 'Interested in procedure',
    value: ''
  };
  office: ReportParam = {
    key: 'ofc',
    description: 'Office',
    value: ''
  };
  referralSource: ReportParam = {
    key: 'rco',
    description: 'Referral Source',
    value: ''
  };
  referralSourceDetail: ReportParam = {
    key: 'rsos',
    description: 'Referral Source Detail',
    value: ''
  };
  ignoreDateRange: ReportParam = {
    key: 'rsos',
    description: 'Ignore Date Range',
    value: false
  };
  activeLeadsOnly: ReportParam = {
    key: 'actonly',
    description: 'Active / All',
    value: true
  };
  showFirstVisit: ReportParam = {
    key: 'sfv',
    description: 'Show 1st visit',
    value: false
  };
  serviceLine: ReportParam = {
    key: 'svcln',
    description: 'Service Line',
    value: ''
  };
}
