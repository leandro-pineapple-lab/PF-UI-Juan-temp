import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class PatientDataAccessFilterModel {
  accessFrom: ReportParam = {
    key: 'dtafr',
    description: 'Access From',
    value: ''
  };
  accessTo: ReportParam = {
    key: 'dtato',
    description: 'Access To',
  };
  user: ReportParam = {
    key: 'user',
    description: 'User',
    value: ''
  };
  pageAccessed: ReportParam = {
    key: 'pageacc',
    description: 'Page Accessed',
    value: ''
  };

  filterQueryParamMapping: { [key: string]: { key: keyof PatientDataAccessFilterModel, type?: ParamQueryType } } = {
    'dtafr': { key: 'accessFrom', type: 'Date' },
    'dtato': { key: 'accessTo', type: 'Date' },
    'user': { key: 'user' },
    'pageacc': { key: 'pageAccessed' },
  };
}
