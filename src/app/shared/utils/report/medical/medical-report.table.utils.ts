import { DatePipe } from "@angular/common";
import { TableHeaderModel } from "src/app/models/common/table/table-header.model";
import { PercentageSignPipe } from "src/app/modules/shared/pipes/percentage-sign/percentage-sign.pipe";

export class MedicalReportsTableUtils {

  static complicationsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'procedure', fieldValue: 'procedure' }),
    new TableHeaderModel({ name: 'Surgery Date', orderColumnName: 'surgeryDate', fieldValue: 'surgeryDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Complication Date', orderColumnName: 'complicationDate', fieldValue: 'complicationDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Complication', orderColumnName: 'complication', fieldValue: 'complication' }),
    new TableHeaderModel({ name: 'Intervention', orderColumnName: 'intervention', fieldValue: 'intervention'}),
    new TableHeaderModel({name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon'}),
    new TableHeaderModel({name: 'Hospital', orderColumnName: 'hospital', fieldValue: 'hospital'}),
    new TableHeaderModel({name: 'Patient Name', orderColumnName: 'patientName', fieldValue: 'patientName'}),
    new TableHeaderModel({name: 'DOB', orderColumnName: 'birthDate', fieldValue: 'birthDateString'}),
    new TableHeaderModel({name: 'Employer', orderColumnName: 'employer', fieldValue: 'employer'}),
    new TableHeaderModel({name: 'MD Referral', orderColumnName: 'referral', fieldValue: 'referral'}),
    new TableHeaderModel({name: 'Status', orderColumnName: 'complicationStatus', fieldValue: 'complicationStatus'}),
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
          tooltip: 'Hospital Stay',
          class: 'text-success',
        },
      ],
    }),
  ];

  static complicationStatsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon' }),
    new TableHeaderModel({ name: '# Surgeries', orderColumnName: 'cntSurg', fieldValue: 'cntSurg' }),
    new TableHeaderModel({ name: '# Short Term Complications', orderColumnName: 'cntSTComplication', fieldValue: 'cntSTComplication' }),
    new TableHeaderModel({ name: '# Long Term Complications', orderColumnName: 'cntLTComplication', fieldValue: 'cntLTComplication' }),
    new TableHeaderModel({ name: '% Complication', orderColumnName: 'complicationPercentage', fieldValue: 'complicationPercentage', pipe: PercentageSignPipe }),
    new TableHeaderModel({name: '# Patient Deaths', orderColumnName: 'cntDeath', fieldValue: 'cntDeath'}),
    new TableHeaderModel({name: '% Deaths', orderColumnName: 'deathPercentage', fieldValue: 'deathPercentage', pipe: PercentageSignPipe}),
  ];

  static longHospitalStaysTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient Name', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'BirthDate', fieldValue: 'birthDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
    new TableHeaderModel({ name: 'Hospital', orderColumnName: 'Hospital', fieldValue: 'hospital' }),
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'Procedure', fieldValue: 'procedure' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'Surgeon', fieldValue: 'surgeon'}),
    new TableHeaderModel({name: 'Admission Date', orderColumnName: 'AdmissionDate', fieldValue: 'admissionDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
    new TableHeaderModel({name: 'Surgery Date', orderColumnName: 'SurgeryDate', fieldValue: 'surgeryDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
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
          tooltip: 'Hospital Stay',
          class: 'text-success',
        },
      ],
    }),
  ];


  static readmissionsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient Name', orderColumnName: 'patientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'birthDate', fieldValue: 'birthDate'}),
    new TableHeaderModel({ name: 'Hospital', orderColumnName: 'hospital', fieldValue: 'hospital' }),
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'srocedure', fieldValue: 'procedure' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon'}),
    new TableHeaderModel({name: 'Surgery Date', orderColumnName: 'surgeryDate', fieldValue: 'surgeryDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
    new TableHeaderModel({name: 'Admission Date', orderColumnName: 'admissionDate', fieldValue: 'admissionDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
    new TableHeaderModel({name: 'Reason for Readmission', orderColumnName: 'readmissionReason', fieldValue: 'readmissionReason'}),
    new TableHeaderModel({name: 'Linked to Bariatric', orderColumnName: 'linkedToBariatric', fieldValue: 'linkedToBariatric'}),
  ];

}
