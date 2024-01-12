import moment from "moment";
import { TableHeaderModel } from "src/app/models/common/table/table-header.model";
import { MonthToStringPipe } from "src/app/modules/shared/pipes/month-to-string.pipe";

export class MonthlyReportsTableUtils {
  static pullThroughTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: '', fieldValue: 'type' }),
    new TableHeaderModel({ name: 'Jan',  fieldValue: 'januaryValue' }),
    new TableHeaderModel({ name: 'Feb', fieldValue: 'februaryValue' }),
    new TableHeaderModel({ name: 'Mar', fieldValue: 'marchValue' }),
    new TableHeaderModel({ name: 'Apr', fieldValue: 'aprilValue' }),
    new TableHeaderModel({ name: 'May', fieldValue: 'mayValue'}),
    new TableHeaderModel({ name: 'Jun', fieldValue: 'juneValue' }),
    new TableHeaderModel({ name: 'Jul', fieldValue: 'julyValue' }),
    new TableHeaderModel({ name: 'Aug', fieldValue: 'augustValue' }),
    new TableHeaderModel({ name: 'Sep', fieldValue: 'septemberValue' }),
    new TableHeaderModel({ name: 'Oct', fieldValue: 'octoberValue' }),
    new TableHeaderModel({ name: 'Nov', fieldValue: 'novemberValue' }),
    new TableHeaderModel({ name: 'Dec', fieldValue: 'decemberValue' }),
    new TableHeaderModel({ name: 'Total', fieldValue: 'total' }),
    new TableHeaderModel({ name: 'Q1',  fieldValue: 'quantity1' }),
    new TableHeaderModel({ name: 'Q2', fieldValue: 'quantity2' }),
    new TableHeaderModel({ name: 'Q3', fieldValue: 'quantity3' }),
    new TableHeaderModel({ name: 'Q4', fieldValue: 'quantity4' }),
  ];

  static surgicalSummarySpecificYearTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: '', fieldValue: 'type' }),
    new TableHeaderModel({ name: 'Jan',  fieldValue: 'januaryValue' }),
    new TableHeaderModel({ name: 'Feb', fieldValue: 'februaryValue' }),
    new TableHeaderModel({ name: 'Mar', fieldValue: 'marchValue' }),
    new TableHeaderModel({ name: 'Apr', fieldValue: 'aprilValue' }),
    new TableHeaderModel({ name: 'May', fieldValue: 'mayValue'}),
    new TableHeaderModel({ name: 'Jun', fieldValue: 'juneValue' }),
    new TableHeaderModel({ name: 'Jul', fieldValue: 'julyValue' }),
    new TableHeaderModel({ name: 'Aug', fieldValue: 'augustValue' }),
    new TableHeaderModel({ name: 'Sep', fieldValue: 'septemberValue' }),
    new TableHeaderModel({ name: 'Oct', fieldValue: 'octoberValue' }),
    new TableHeaderModel({ name: 'Nov', fieldValue: 'novemberValue' }),
    new TableHeaderModel({ name: 'Dec', fieldValue: 'decemberValue' }),
    new TableHeaderModel({ name: 'Total', fieldValue: 'total' }),
  ];

  static surgicalSummaryLastYearsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: '', fieldValue: 'type' }),
    new TableHeaderModel({ name: moment().subtract(5, "years").year().toString(),  fieldValue: 'fifthYearValue' }),
    new TableHeaderModel({ name: moment().subtract(4, "years").year().toString(), fieldValue: 'fourthYearValue' }),
    new TableHeaderModel({ name: moment().subtract(3, "years").year().toString(), fieldValue: 'thirdYearValue' }),
    new TableHeaderModel({ name: moment().subtract(2, "years").year().toString(), fieldValue: 'secondYearValue' }),
    new TableHeaderModel({ name: moment().subtract(1, "years").year().toString(), fieldValue: 'firstYearValue'}),
    new TableHeaderModel({ name: moment().year().toString(), fieldValue: 'thisYearValue' }),
    new TableHeaderModel({ name: 'Total', fieldValue: 'total' }),
  ];

  static bariatricSurgicalSummaryTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Month', fieldValue: 'monthName' }),
    new TableHeaderModel({ name: 'RNY',  fieldValue: 'rnyValue' }),
    new TableHeaderModel({ name: 'Sleeve', fieldValue: 'sleeveValue' }),
    new TableHeaderModel({ name: 'Revision', fieldValue: 'revisionValue' }),
    new TableHeaderModel({ name: 'Total', fieldValue: 'total' }),
  ];

  static leadsByPayerTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Payer', fieldValue: 'payer', orderColumnName: 'payer' }),
    new TableHeaderModel({ name: 'Jan',  fieldValue: 'januaryValue', orderColumnName: 'januaryValue' }),
    new TableHeaderModel({ name: 'Feb', fieldValue: 'februaryValue', orderColumnName: 'februaryValue' }),
    new TableHeaderModel({ name: 'Mar', fieldValue: 'marchValue', orderColumnName: 'marchValue' }),
    new TableHeaderModel({ name: 'Apr', fieldValue: 'aprilValue', orderColumnName: 'aprilValue' }),
    new TableHeaderModel({ name: 'May', fieldValue: 'mayValue', orderColumnName: 'mayValue'}),
    new TableHeaderModel({ name: 'Jun', fieldValue: 'juneValue', orderColumnName: 'juneValue' }),
    new TableHeaderModel({ name: 'Jul', fieldValue: 'julyValue', orderColumnName: 'julyValue' }),
    new TableHeaderModel({ name: 'Aug', fieldValue: 'augustValue', orderColumnName: 'augustValue' }),
    new TableHeaderModel({ name: 'Sep', fieldValue: 'septemberValue', orderColumnName: 'septemberValue' }),
    new TableHeaderModel({ name: 'Oct', fieldValue: 'octoberValue', orderColumnName: 'octoberValue' }),
    new TableHeaderModel({ name: 'Nov', fieldValue: 'novemberValue', orderColumnName: 'novemberValue' }),
    new TableHeaderModel({ name: 'Dec', fieldValue: 'decemberValue', orderColumnName: 'decemberValue' }),
    new TableHeaderModel({ name: 'Total', fieldValue: 'total', orderColumnName: 'total' }),
  ];

  static monthlyStatsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: '', fieldValue: 'stat' }),
    new TableHeaderModel({ name: 'Jan',  fieldValue: 'januaryValue' }),
    new TableHeaderModel({ name: 'Feb', fieldValue: 'februaryValue' }),
    new TableHeaderModel({ name: 'Mar', fieldValue: 'marchValue' }),
    new TableHeaderModel({ name: 'Apr', fieldValue: 'aprilValue' }),
    new TableHeaderModel({ name: 'May', fieldValue: 'mayValue'}),
    new TableHeaderModel({ name: 'Jun', fieldValue: 'juneValue' }),
    new TableHeaderModel({ name: 'Jul', fieldValue: 'julyValue' }),
    new TableHeaderModel({ name: 'Aug', fieldValue: 'augustValue' }),
    new TableHeaderModel({ name: 'Sep', fieldValue: 'septemberValue' }),
    new TableHeaderModel({ name: 'Oct', fieldValue: 'octoberValue' }),
    new TableHeaderModel({ name: 'Nov', fieldValue: 'novemberValue' }),
    new TableHeaderModel({ name: 'Dec', fieldValue: 'decemberValue' }),
  ];

  static appointmentSummaryTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Month', fieldValue: 'month', pipe: MonthToStringPipe, pipeArgs: 'short' }),
    new TableHeaderModel({ name: 'Confirmed+Completed',  fieldValue: 'confAndCompletedAmount' }),
    new TableHeaderModel({ name: 'Confirmed', fieldValue: 'confirmedAmount' }),
    new TableHeaderModel({ name: 'Completed', fieldValue: 'completedAmount' }),
    new TableHeaderModel({ name: 'Postponed', fieldValue: 'postponedAmount' }),
    new TableHeaderModel({ name: 'Cancelled', fieldValue: 'cancelledAmount'}),
    new TableHeaderModel({ name: 'No show', fieldValue: 'noShowAmount' }),
    new TableHeaderModel({ name: 'Total Appointments',  fieldValue: 'appointmentsAmount' }),
  ];
}
