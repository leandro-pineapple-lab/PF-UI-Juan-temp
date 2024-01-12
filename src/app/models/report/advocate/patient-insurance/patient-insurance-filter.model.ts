import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class PatientInsuranceFilterModel {
  status: ReportParam = {
    key: 'stat',
    description: 'Status',
    value: []
  };
  insuranceCompany: ReportParam = {
    key: 'insco',
    description: 'Insurance Company',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };

  filterQueryParamMapping: { [key: string]: { key: keyof PatientInsuranceFilterModel, type?: ParamQueryType } } = {
    'stat': { key: 'status' },
    'insco': { key: 'insuranceCompany' },
    'ano': { key: 'anonymize', type: 'boolean' },
  };
}
