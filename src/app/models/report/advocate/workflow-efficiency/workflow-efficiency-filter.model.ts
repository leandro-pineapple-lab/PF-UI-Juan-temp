import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class WorkflowEfficiencyFilterModel {
  contactFrom: ReportParam = {
    key: 'dtcfr',
    description: 'Contact From',
    value: ''
  };
  contactTo: ReportParam = {
    key: 'dtcto',
    description: 'Contact To',
  };
  insuranceCo: ReportParam = {
    key: 'insco',
    description: 'Insurance Company',
    value: ''
  };
  insuranceType: ReportParam = {
    key: 'instype',
    description: 'Insurance Type',
    value: ''
  };
  showDetails: ReportParam = {
    key: 'showdet',
    description: 'Show Details',
    value: false
  };
  surgeon: ReportParam = {
    key: 'surgeon',
    description: 'Surgeon',
    value: ''
  };
  startType: ReportParam = {
    key: 'starttype',
    description: 'Start Type',
    value: 'L'
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof WorkflowEfficiencyFilterModel, type?: ParamQueryType } } = {
    'dtcfr': { key: 'contactFrom', type: 'Date' },
    'dtcto': { key: 'contactTo', type: 'Date' },
    'insco': { key: 'insuranceCo' },
    'instype': { key: 'insuranceType' },
    'showdet': { key: 'showDetails' },
    'surgeon': { key: 'surgeon' },
    'starttype': { key: 'startType' },
    'ano': { key: 'anonymize', type: 'boolean' },
  };
}
