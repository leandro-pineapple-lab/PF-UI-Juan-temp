import { TableHeaderModel } from "src/app/models/common/table/table-header.model";

export class MarketingReportsTableUtils {

  static currentYear = new Date().getFullYear();

  static surgicalHxTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Age', orderColumnName: 'Age', fieldValue: 'age' }),
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'Procedure', fieldValue: 'procedure' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Surgery Date', orderColumnName: 'SurgeryDate', fieldValue: 'surgeryDateString' }),
    new TableHeaderModel({name: 'Weight lbs', orderColumnName: 'WeightLbs', fieldValue: 'weightLbs'}),
    new TableHeaderModel({ name: 'BMI', orderColumnName: 'Bmi', fieldValue: 'bmi' }),
    new TableHeaderModel({ name: 'Last Visit', orderColumnName: 'LastVisit', fieldValue: 'lastVisitString' }),
    new TableHeaderModel({ name: 'Weight lbs', orderColumnName: 'WeightLbs2', fieldValue: 'weightLbs2' }),
    new TableHeaderModel({ name: 'BMI', orderColumnName: 'Bmi2', fieldValue: 'bmi2' }),
    new TableHeaderModel({ name: '% Loss', orderColumnName: 'LossPercentage', fieldValue: 'lossPercentage' }),
    new TableHeaderModel({ name: 'After Weeks', orderColumnName: 'AfterWeeks', fieldValue: 'afterWeeks' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-file',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
        {
          actionName: 'Hospital stay',
          icon: 'fa fa-hospital-o',
          tooltip: 'Hospital stay',
          class: 'text-success',
        },
      ],
    }),
  ];

  static employerStatsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'BirthDate', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: `Bariatric Procedures <${this.currentYear - 2}`, orderColumnName: 'YearsAgoBariatric', fieldValue: 'yearsAgoBariatric' }),
    new TableHeaderModel({ name: `Bariatric Procedures ${this.currentYear - 2}`, orderColumnName: 'PenultimateYearBariatric', fieldValue: 'penultimateYearBariatric' }),
    new TableHeaderModel({ name: `Bariatric Procedures ${this.currentYear - 1}`, orderColumnName: 'PreviousYearBariatric', fieldValue: 'previousYearBariatric' }),
    new TableHeaderModel({name: `Bariatric Procedures ${this.currentYear}`, orderColumnName: 'CurrentYearBariatric', fieldValue: 'currentYearBariatric'}),
    new TableHeaderModel({ name: `Other Procedures <${this.currentYear - 2}`, orderColumnName: 'YearsAgoOther', fieldValue: 'yearsAgoOther' }),
    new TableHeaderModel({ name: `Other Procedures ${this.currentYear - 2}`, orderColumnName: 'PenultimateYearOther', fieldValue: 'penultimateYearOther' }),
    new TableHeaderModel({ name: `Other Procedures ${this.currentYear - 1}`, orderColumnName: 'PreviousYearOther', fieldValue: 'previousYearOther' }),
    new TableHeaderModel({name: `Other Procedures ${this.currentYear}`, orderColumnName: 'CurrentYearOther', fieldValue: 'currentYearOther'}),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-file',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
        {
          actionName: 'Hospital stay',
          icon: 'fa fa-hospital-o',
          tooltip: 'Hospital stay',
          class: 'text-success',
        },
      ],
    }),
  ];

  static employerTotalStatsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: '', fieldValue: 'stat' }),
    new TableHeaderModel({ name: `Bariatric Procedures <${this.currentYear - 2}`, orderColumnName: 'YearsAgoBariatric', fieldValue: 'yearsAgoBariatric' }),
    new TableHeaderModel({ name: `Bariatric Procedures ${this.currentYear - 2}`, orderColumnName: 'PenultimateYearBariatric', fieldValue: 'penultimateYearBariatric' }),
    new TableHeaderModel({ name: `Bariatric Procedures ${this.currentYear - 1}`, orderColumnName: 'PreviousYearBariatric', fieldValue: 'previousYearBariatric' }),
    new TableHeaderModel({name: `Bariatric Procedures ${this.currentYear}`, orderColumnName: 'CurrentYearBariatric', fieldValue: 'currentYearBariatric'}),
    new TableHeaderModel({ name: `Other Procedures <${this.currentYear - 2}`, orderColumnName: 'YearsAgoOther', fieldValue: 'yearsAgoOther' }),
    new TableHeaderModel({ name: `Other Procedures ${this.currentYear - 2}`, orderColumnName: 'PenultimateYearOther', fieldValue: 'penultimateYearOther' }),
    new TableHeaderModel({ name: `Other Procedures ${this.currentYear - 1}`, orderColumnName: 'PreviousYearOther', fieldValue: 'previousYearOther' }),
    new TableHeaderModel({name: `Other Procedures ${this.currentYear}`, orderColumnName: 'CurrentYearOther', fieldValue: 'currentYearOther'}),
  ];

  static employerPatientsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'BirthDate', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Employer', orderColumnName: 'Employer', fieldValue: 'employer' }),
    new TableHeaderModel({ name: '1st Contact', orderColumnName: 'FirstContact', fieldValue: 'firstContactString' }),
    new TableHeaderModel({ name: 'Ini. Weight', orderColumnName: 'InitialWeight', fieldValue: 'initialWeight' }),
    new TableHeaderModel({name: 'Last Visit', orderColumnName: 'LastVisit', fieldValue: 'lastVisitString'}),
    new TableHeaderModel({ name: 'Surgery', orderColumnName: 'Surgery', fieldValue: 'surgery' }),
    new TableHeaderModel({ name: 'Surgery Date', orderColumnName: 'SurgeryDate', fieldValue: 'surgeryDateString' }),
    new TableHeaderModel({ name: 'is Patient', orderColumnName: 'IsPatient', fieldValue: 'isPatient' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'status' }),
    new TableHeaderModel({name: 'How Hear From Us', orderColumnName: 'ReferralSource', fieldValue: 'referralSource'}),

    new TableHeaderModel({
      name: 'Action',
      applyCanSaveSettingsDirective: true,
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-file',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
        {
          actionName: 'Hospital stay',
          icon: 'fa fa-hospital-o',
          tooltip: 'Hospital stay',
          class: 'text-success',
        },
      ],
    }),
  ];

  static employerPatientsTotalsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Employer', orderColumnName: 'Employer', fieldValue: 'employer' }),
    new TableHeaderModel({ name: '# Employees', orderColumnName: 'Total', fieldValue: 'total' })
  ];

}
