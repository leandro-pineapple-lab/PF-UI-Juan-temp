import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class StopProcessFilterModel {
  from: ReportParam = {
    key: 'dtfr',
    description: 'From',
    value: ''
  };
  to: ReportParam = {
    key: 'dtto',
    description: 'To',
  };
  statusType: ReportParam = {
    key: 'stattype',
    description: 'Status Type',
    value: 'P'
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof StopProcessFilterModel, type?: ParamQueryType } } = {
    'dtfr': { key: 'from', type: 'Date' },
    'dtto': { key: 'to', type: 'Date' },
    'stattype': { key: 'statusType' },
    'ano': { key: 'anonymize', type: 'boolean' },
  };
}
