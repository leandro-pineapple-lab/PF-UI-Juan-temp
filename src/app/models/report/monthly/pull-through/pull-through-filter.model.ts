import { ReportParam } from "src/types/report.types";

export class PullThroughFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear() - 1
  };
}
