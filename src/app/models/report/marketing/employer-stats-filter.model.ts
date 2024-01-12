import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class EmployerStatsFilterModel {
  employer: ReportParam = {
    key: 'employer',
    description: 'Employer',
  };

  filterQueryParamMapping: { [key: string]: { key: keyof EmployerStatsFilterModel, type?: ParamQueryType } } = {
    'employer': { key: 'employer', type: "Array" },
  };
}
