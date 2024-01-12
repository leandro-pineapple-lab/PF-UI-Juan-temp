import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class ComplicationsFilterModel {
  surgeryFrom: ReportParam = {
    key: 'dtsf',
    description: 'Surgery From',
  };
  surgeryTo: ReportParam = {
    key: 'dtst',
    description: 'Surgery To',
  };
  complicationFrom: ReportParam = {
    key: 'dtcf',
    description: 'Complication From',
  };
  complicationTo: ReportParam = {
    key: 'dtct',
    description: 'Complication To',
  };
  procedure: ReportParam = {
    key: 'procedure',
    description: 'Procedure',
    value: ''
  };
  complicationType: ReportParam = {
    key: 'comptype',
    description: 'Complication Type',
    value: 'B'
  };
  complicationStatus: ReportParam = {
    key: 'compstatus',
    description: 'Complication Status',
    value: 'B'
  };
  surgeon: ReportParam = {
    key: 'surg',
    description: 'Surgeon',
    value: ''
  };
  hospital: ReportParam = {
    key: 'hosp',
    description: 'Hospital',
    value: ''
  };
  referral: ReportParam = {
    key: 'referral',
    description: 'MD Referral',
    value: ''
  };
  employer: ReportParam = {
    key: 'employer',
    description: 'Employer',
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof ComplicationsFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'dtcf': { key: 'complicationFrom', type: 'Date'},
    'dtct': { key: 'complicationTo', type: 'Date' },
    'procedure': { key: 'procedure' },
    'comptype': { key: 'complicationType' },
    'compstatus': { key: 'complicationStatus' },
    'surg': { key: 'surgeon' },
    'hosp': { key: 'hospital' },
    'referral': { key: 'referral' },
    'employer': { key: 'employer' },
    'ano': { key: 'anonymize', type: 'boolean' }
  };
}
