import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class AppointmentSummaryFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear()
  };
  provider: ReportParam = {
    key: 'provider',
    description: 'Provider',
    value: ''
  };
  type: ReportParam = {
    key: 'type',
    description: 'Type',
    value: ''
  };

  filterQueryParamMapping: { [key: string]: { key: keyof AppointmentSummaryFilterModel, type?: ParamQueryType } } = {
    'year': { key: 'year'},
    'provider': { key: 'provider' },
    'type': { key: 'type' },
  };

}
