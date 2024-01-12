import { ReportParam } from "src/types/report.types";
import { ParamQueryType } from "src/types/types";

export class ComplicationStatsFilterModel {
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
  surgeryType: ReportParam = {
    key: 'surgtype',
    description: 'Surgery Type',
    value: 'B',
    customValue: 'Bariatric'
  };


  filterQueryParamMapping: { [key: string]: { key: keyof ComplicationStatsFilterModel, type?: ParamQueryType } } = {
    'dtsf': { key: 'surgeryFrom', type: 'Date' },
    'dtst': { key: 'surgeryTo', type: 'Date' },
    'surgeon': { key: 'surgeon'},
    'procedure': { key: 'procedure' },
    'surgtype': { key: 'surgeryType' },
  };

}
