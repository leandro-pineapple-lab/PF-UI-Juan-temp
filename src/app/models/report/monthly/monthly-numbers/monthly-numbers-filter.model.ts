import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class MonthlyNumbersFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear()
  };

  filterQueryParamMapping: { [key: string]: { key: keyof MonthlyNumbersFilterModel, type?: ParamQueryType } } = {
    'year': { key: 'year' },
  };
}
