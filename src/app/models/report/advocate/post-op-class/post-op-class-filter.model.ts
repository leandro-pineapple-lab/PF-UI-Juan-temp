import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class PostOpClassFilterModel {
  type: ReportParam = {
    key: 'typ',
    description: 'Type',
    value: ''
  };
  classFrom: ReportParam = {
    key: 'dts',
    description: 'Start Date',
  };
  classTo: ReportParam = {
    key: 'dte',
    description: 'End Date',
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof PostOpClassFilterModel, type?: ParamQueryType } } = {
    'typ': { key: 'type' },
    'dts': { key: 'classFrom', type: "Date" },
    'dte': { key: 'classTo', type: "Date" },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
