import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class HandoutStatusFilterModel {
  assignedFrom: ReportParam = {
    key: 'dtaf',
    description: 'Assigned From'
  };
  assignedTo: ReportParam = {
    key: 'dtat',
    description: 'Assigned To',
  };
  provider: ReportParam = {
    key: 'provider',
    description: 'Provider',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof HandoutStatusFilterModel, type?: ParamQueryType } } = {
    'dtaf': { key: 'assignedFrom', type: "Date" },
    'dtat': { key: 'assignedTo', type: "Date" },
    'provider': { key: 'provider' },
    'ano': { key: 'anonymize', type: "boolean" },
  };
}
