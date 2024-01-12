import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class LongHospitalStaysFilterModel {
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
  procedure: ReportParam = {
    key: 'procedure',
    description: 'Procedure',
    value: ''
  };
  hospital: ReportParam = {
    key: 'hosp',
    description: 'Hospital',
    value: ''
  };
  stayDuration: ReportParam = {
    key: 'stduration',
    description: 'Stay Duration',
    value: 7
  };
  anonymize: ReportParam = {
    key: 'ano',
    description: 'Anonymize',
    value: false
  };


  filterQueryParamMapping: { [key: string]: { key: keyof LongHospitalStaysFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'surgeon': { key: 'surgeon'},
    'procedure': { key: 'procedure' },
    'hosp': { key: 'hospital' },
    'stduration': { key: 'stayDuration' },
    'ano': { key: 'anonymize' },
  };

}
