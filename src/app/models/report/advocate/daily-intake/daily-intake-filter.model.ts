import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class DailyIntakeReportFilterModel {
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
    key: 'prci',
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
    key: 'idr',
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

  filterQueryParamMapping: { [key: string]: { key: keyof DailyIntakeReportFilterModel, type?: ParamQueryType } } = {
    'dtif': { key: 'intakeFrom', type: 'Date' },
    'dtit': { key: 'intakeTo', type: 'Date' },
    'dtcf': { key: 'lastContactFrom', type: 'Date' },
    'dtct': { key: 'lastContactTo', type: 'Date' },
    'lds': { key: 'leadSource' },
    'adv': { key: 'advocate' },
    'stat': { key: 'status' },
    'city': { key: 'city' },
    'state': { key: 'state' },
    'ldt': { key: 'leadType' },
    'surg': { key: 'surgeon' },
    'ano': { key: 'anonymize', type: "boolean" },
    'prc': { key: 'plannedProcedure' },
    'prci': { key: 'interestedProcedure' },
    'ofc': { key: 'office' },
    'rco': { key: 'referralSource' },
    'rsos': { key: 'referralSourceDetail' },
    'idr': { key: 'ignoreDateRange', type: "boolean" },
    'actonly': { key: 'activeLeadsOnly', type: "boolean" },
    'sfv': { key: 'showFirstVisit', type: "boolean" },
    'svcln': { key: 'serviceLine' },
  };

}
