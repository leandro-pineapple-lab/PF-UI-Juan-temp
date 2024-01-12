import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class PreOpFilterModel {
  subStatus: ReportParam = {
    key: 'ssc',
    description: 'SubStatus',
    value: ''
  };
  lastContactFrom: ReportParam = {
    key: 'dtcf',
    description: 'Last Contact From',
  };
  lastContactTo: ReportParam = {
    key: 'dtict',
    description: 'Last Contact To',
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
  insuranceCompany: ReportParam = {
    key: 'insco',
    description: 'Insurance Company',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof PreOpFilterModel, type?: ParamQueryType } } = {
    'ssc': { key: 'subStatus' },
    'dtcf': { key: 'lastContactFrom', type: "Date" },
    'dtict': { key: 'lastContactTo', type: "Date" },
    'surg': { key: 'surgeon' },
    'adv': { key: 'advocate' },
    'insco': { key: 'insuranceCompany' },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
