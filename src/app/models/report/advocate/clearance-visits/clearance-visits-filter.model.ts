import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class ClearanceVisitsFilterModel {
  visitFrom: ReportParam = {
    key: 'dtvf',
    description: 'Visit From',
  };
  visitTo: ReportParam = {
    key: 'dtvt',
    description: 'Visit To',
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

  filterQueryParamMapping: { [key: string]: { key: keyof ClearanceVisitsFilterModel, type?: ParamQueryType } } = {
    'dtvf': { key: 'visitFrom', type: "Date" },
    'dtvt': { key: 'visitTo', type: "Date" },
    'surg': { key: 'surgeon' },
    'adv': { key: 'advocate' },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
