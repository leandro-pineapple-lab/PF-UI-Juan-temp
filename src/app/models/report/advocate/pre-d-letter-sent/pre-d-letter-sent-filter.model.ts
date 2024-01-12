import { ReportParam } from "src/types/report.types";

export class PreDLetterSentFilterModel {
  rangeType: ReportParam = {
    key: 'rgt',
    description: 'RangeType',
    value: 'S'
  };
  from: ReportParam = {
    key: 'dtif',
    description: 'Pre-D Sent from',
  };
  to: ReportParam = {
    key: 'dtit',
    description: 'Pre-D Sent to',
  };
  surgeon: ReportParam = {
    key: 'surg',
    description: 'Surgeon',
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
}
