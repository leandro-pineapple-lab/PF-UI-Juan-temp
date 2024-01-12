import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class CompletedHomeworkReportFilterModel {
  orderedSince: ReportParam = {
    key: 'dts',
    description: 'Ordered Since',
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

  filterQueryParamMapping: { [key: string]: { key: keyof CompletedHomeworkReportFilterModel, type?: ParamQueryType } } = {
    'dts': { key: 'orderedSince', type: "Date" },
    'adv': { key: 'advocate'},
    'surg': { key: 'surgeon' },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
