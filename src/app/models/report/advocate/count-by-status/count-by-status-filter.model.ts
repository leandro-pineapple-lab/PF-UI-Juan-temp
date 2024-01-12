import { ReportParam } from "src/types/report.types";

export class CountByStatusFilterModel {
  intakeFrom: ReportParam = {
    key: 'lfdt',
    description: 'Intake From'
  };
  intakeTo: ReportParam = {
    key: 'ltdt',
    description: 'Intake To'
  };
  statusFrom: ReportParam = {
    key: 'fdt',
    description: 'Status From'
  };
  statusTo: ReportParam = {
    key: 'tdt',
    description: 'Status To'
  };
  status: ReportParam = {
    key: 'stat',
    description: 'Status',
    value: ''
  };
}
