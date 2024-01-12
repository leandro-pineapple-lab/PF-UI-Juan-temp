import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class InitialConsultsFilterModel {
  initialConsultFrom: ReportParam = {
    key: 'dticf',
    description: 'Initial Consult From',
  };
  initialConsultTo: ReportParam = {
    key: 'dtict',
    description: 'Initial Consult To',
  };
  advocate: ReportParam = {
    key: 'adv',
    description: 'Advocate',
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

  filterQueryParamMapping: { [key: string]: { key: keyof InitialConsultsFilterModel, type?: ParamQueryType } } = {
    'dticf': { key: 'initialConsultFrom', type: "Date" },
    'dtict': { key: 'initialConsultTo', type: "Date" },
    'adv': { key: 'advocate'},
    'surg': { key: 'surgeon' },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
