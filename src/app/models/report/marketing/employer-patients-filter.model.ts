import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class EmployerPatientsFilterModel {
  employer: ReportParam = {
    key: 'employer',
    description: 'Employer',
  };
  zip: ReportParam = {
    key: 'zip',
    description: 'Zip',
    value: []
  };
  reportLevel: ReportParam = {
    key: 'level',
    description: 'Report Level',
    value: 'D',
    customValue: 'Details'
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof EmployerPatientsFilterModel, type?: ParamQueryType } } = {
    'employer': { key: 'employer' },
    'zip': { key: 'zip', type: "Array" },
    'level': { key: 'reportLevel' },
    'ano': { key: 'anonymize' },
  };
}
