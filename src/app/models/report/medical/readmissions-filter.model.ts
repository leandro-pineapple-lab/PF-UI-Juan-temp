import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class ReadmissionsFilterModel {
  surgeryFrom: ReportParam = {
    key: 'dtsf',
    description: 'Surgery From',
  };
  surgeryTo: ReportParam = {
    key: 'dtst',
    description: 'Surgery To',
  };
  readmissionFrom: ReportParam = {
    key: 'dtrf',
    description: 'Readmission From',
  };
  readmissionTo: ReportParam = {
    key: 'dtrt',
    description: 'Readmission To',
  };
  procedure: ReportParam = {
    key: 'procedure',
    description: 'Procedure',
    value: ''
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
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof ReadmissionsFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'dtrf': { key: 'readmissionFrom', type: 'Date'},
    'dtrt': { key: 'readmissionTo', type: 'Date' },
    'procedure': { key: 'procedure' },
    'surg': { key: 'surgeon' },
    'hosp': { key: 'hospital' },
    'ano': { key: 'anonymize', type: 'boolean' }
  };
}
