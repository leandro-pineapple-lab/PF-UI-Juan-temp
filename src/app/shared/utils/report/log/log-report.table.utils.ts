import { DatePipe } from "@angular/common";
import { TableHeaderModel } from "src/app/models/common/table/table-header.model";

export class LogReportsTableUtils {
  static dataAccessTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Date', orderColumnName: 'AccessedOn', fieldValue: 'accessedOn', pipe: DatePipe, pipeArgs: 'd/M/yyyy h:mm:ss a' }),
    new TableHeaderModel({ name: 'Patient', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Access By', orderColumnName: 'AccessedBy', fieldValue: 'accessedBy' }),
    new TableHeaderModel({ name: 'Page Accessed', orderColumnName: 'AccessedPage', fieldValue: 'accessedPage'})
  ];
}
