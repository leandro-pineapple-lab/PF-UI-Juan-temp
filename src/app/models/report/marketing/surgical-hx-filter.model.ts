import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class SurgicalHxFilterModel {
  surgeryFrom: ReportParam = {
    key: 'dtsf',
    description: 'Surgery From',
  };
  surgeryTo: ReportParam = {
    key: 'dtst',
    description: 'Surgery To',
  };
  surgeon: ReportParam = {
    key: 'surgeon',
    description: 'Surgeon',
    value: ''
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };
  procedure: ReportParam = {
    key: 'procedure',
    description: 'Procedure',
    value: ''
  };


  filterQueryParamMapping: { [key: string]: { key: keyof SurgicalHxFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'surgeon': { key: 'surgeon'},
    'ano': { key: 'anonymize', type: "boolean" },
    'procedure': { key: 'procedure', type: 'Date' },
  };

}
