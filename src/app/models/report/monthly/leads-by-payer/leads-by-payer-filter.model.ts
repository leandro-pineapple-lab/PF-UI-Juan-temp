import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class LeadsByPayerFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear()
  };
  surgeon: ReportParam = {
    key: 'surgeon',
    description: 'Surgeon',
    value: ''
  };

  filterQueryParamMapping: { [key: string]: { key: keyof LeadsByPayerFilterModel, type?: ParamQueryType } } = {
    'year': { key: 'year' },
    'surgeon': { key: 'surgeon' }
  };
}
