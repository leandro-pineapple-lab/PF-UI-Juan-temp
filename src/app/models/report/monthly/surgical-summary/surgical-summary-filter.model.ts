import { ReportParam } from "src/types/report.types";

export class SurgicalSummaryFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear()
  };
  reportType: ReportParam = {
    key: 'show',
    description: 'Report Type',
    value: 'A',
    customValue: 'All'
  };
  procedureType: ReportParam = {
    key: 'proctype',
    description: 'Procedure Type'
  };
}
