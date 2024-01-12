import { ReportParam } from "src/types/report.types";

export class BariatricSurgeryFilterModel {
  year: ReportParam = {
    key: 'year',
    description: 'Reporting Year',
    value: new Date().getFullYear()
  };
}
