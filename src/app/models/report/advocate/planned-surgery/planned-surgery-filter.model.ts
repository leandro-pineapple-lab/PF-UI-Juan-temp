import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class PlannedSurgeryFilterModel {
  surgeryFrom: ReportParam = {
    key: 'dtsf',
    description: 'Surgery From',
    value: ''
  };
  surgeryTo: ReportParam = {
    key: 'dtst',
    description: 'Surgery To',
  };
  surgeon: ReportParam = {
    key: 'surgeon',
    description: 'Surgeon',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof PlannedSurgeryFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'surgeon': { key: 'surgeon' },
    'ano': { key: 'anonymize', type: 'boolean' },
  };
}
