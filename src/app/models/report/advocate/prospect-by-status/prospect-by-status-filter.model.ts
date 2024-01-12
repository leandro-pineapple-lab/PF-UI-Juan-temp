import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class ProspectByStatusFilterModel {
  intakeFrom: ReportParam = {
    key: 'dtif',
    description: 'Intake from',
    value: ''
  };
  intakeTo: ReportParam = {
    key: 'dtit',
    description: 'Intake to',
  };
  useDateRange: ReportParam = {
    key: 'udt',
    description: 'Use Date Range',
    value: true
  };
  status: ReportParam = {
    key: 'scd',
    description: 'Status',
    value: ''
  };
  subStatus: ReportParam = {
    key: 'ssc',
    description: 'SubStatus',
    value: ''
  };
  patientType: ReportParam = {
    key: 'rpt',
    description: 'Patient Type',
    value: ''
  };
  advocate: ReportParam = {
    key: 'adv',
    description: 'Advocate',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof ProspectByStatusFilterModel, type?: ParamQueryType } } = {
    'dtif': { key: 'intakeFrom', type: 'Date' },
    'dtit': { key: 'intakeTo', type: 'Date' },
    'udt': { key: 'useDateRange' },
    'scd': { key: 'status' },
    'ssc': { key: 'subStatus' },
    'rpt': { key: 'patientType' },
    'adv': { key: 'advocate' },
    'ano': { key: 'anonymize', type: 'boolean' },
  };
}
