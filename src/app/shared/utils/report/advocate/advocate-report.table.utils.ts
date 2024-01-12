import { DatePipe } from "@angular/common";
import { TableHeaderModel } from "src/app/models/common/table/table-header.model";
import { TableHeader } from "src/types/types";

export class AdvocateReportsTableUtils {
  static dailyIntakeTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Lead Type', orderColumnName: 'LeadType', fieldValue: 'leadType' }),
    new TableHeaderModel({ name: 'Source', orderColumnName: 'Source', fieldValue: 'origin' }),
    new TableHeaderModel({ name: 'Date Created', orderColumnName: 'DateCreated', fieldValue: 'dateCreatedString' }),
    new TableHeaderModel({ name: 'Last Contact', orderColumnName: 'LastContact', fieldValue: 'lastContactString' }),
    new TableHeaderModel({name: '1st Visit/Appt', orderColumnName: 'NextContact', fieldValue: 'nextContactString', hide: true}),
    new TableHeaderModel({ name: 'Lag (days)', orderColumnName: 'LagDays', fieldValue: 'lagDays' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({ name: 'How Hear from us', orderColumnName: 'HowHearFromUs', fieldValue: 'howHearFromUs' }),
    new TableHeaderModel({ name: 'Confirmed Referral', orderColumnName: 'ConfirmedReferralName', fieldValue: 'confirmedReferralName' }),
    new TableHeaderModel({ name: 'Active', orderColumnName: 'IsActive', fieldValue: 'isActive' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'patientStatus' }),
    new TableHeaderModel({ name: 'City', orderColumnName: 'City', fieldValue: 'leadCity' }),
    new TableHeaderModel({ name: 'State', orderColumnName: 'State', fieldValue: 'leadState' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Interest in Procedure', orderColumnName: 'InterestedInProcedure', fieldValue: 'plannedProcedure' }),
    new TableHeaderModel({ name: 'Service Line', orderColumnName: 'ServiceLine', fieldValue: 'serviceLine' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static duplicateDailyIntakeTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Email', orderColumnName: 'Email', fieldValue: 'email' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'patientStatus' }),
    new TableHeaderModel({ name: 'Date Created', orderColumnName: 'DateCreated', fieldValue: 'dateCreatedString' }),
    new TableHeaderModel({ name: 'Origin', orderColumnName: 'Source', fieldValue: 'origin' }),
    new TableHeaderModel({ name: 'Lead Type', orderColumnName: 'LeadType', fieldValue: 'leadType' }),
    new TableHeaderModel({ name: 'Is Patient', orderColumnName: 'IsPatient', fieldValue: 'isPatient' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static completedHomeworkTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'patientStatus' }),
    new TableHeaderModel({ name: 'Insurance Type', orderColumnName: 'InsuranceType', fieldValue: 'insuranceType' }),
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'Procedure', fieldValue: 'procedureName' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({ name: 'Completed On', orderColumnName: 'CompletedOn', fieldValue: 'mostRecentDateString' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static initialConsultsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'DateOfBirth', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Visit Date', orderColumnName: 'VisitDate', fieldValue: 'visitDateString' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
        {
          actionName: 'Patient settings',
          icon: 'fa fa-cog',
          tooltip: 'Patient settings',
          class: 'text-danger',
        },
      ],
    }),
  ];

  static preOpTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Insurance', orderColumnName: 'InsuranceCompany', fieldValue: 'insuranceCompany' }),
    new TableHeaderModel({ name: 'Last Contact', orderColumnName: 'LastContact', fieldValue: 'lastContactString' }),
    new TableHeaderModel({ name: 'SubStatus', orderColumnName: 'SubStatus', fieldValue: 'subStatus' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({ name: 'Procedure Name', orderColumnName: 'Procedure', fieldValue: 'procedureName' }),
    new TableHeaderModel({ name: 'Tentative Date', orderColumnName: 'TentativeDate', fieldValue: 'tentativeDateString' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static clearanceVisitsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'DateOfBirth', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Visit Date', orderColumnName: 'VisitDate', fieldValue: 'visitDateString' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'SurgeonName', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-file',
          tooltip: 'See profile',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static insuranceVerificationTableHeaders: TableHeader[] = [
    new TableHeaderModel({ name: 'Payer', orderColumnName: 'Payer', fieldValue: 'payer' }),
    new TableHeaderModel({ name: '# Patients', orderColumnName: 'PatientsAmount', fieldValue: 'patientsAmount' }),
    new TableHeaderModel({ name: 'Min Request Date', orderColumnName: 'MinRequestDate', fieldValue: 'minRequestDateString' }),
    new TableHeaderModel({ name: 'Max Request Date', orderColumnName: 'MaxRequestDate', fieldValue: 'maxRequestDateString' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'See profile',
          icon: 'fa fa-info',
          tooltip: 'See profile',
          class: 'text-info',
        },
      ],
    }),
  ];

  static patientInsuranceTableHeaders: TableHeader[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'DateOfBirth', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Insurance', orderColumnName: 'InsuranceCompany', fieldValue: 'insuranceCompany' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'status' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-folder',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
        {
          actionName: 'homework',
          icon: 'fa fa-cogs',
          tooltip: 'homework',
          class: 'text-info',
        },
      ],
    }),
  ];

  static stopProcessTableHeaders: TableHeader[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'SubStatus', orderColumnName: 'SubStatus', fieldValue: 'statusDescription' }),
    new TableHeaderModel({ name: 'Stopped On', orderColumnName: 'StoppedOn', fieldValue: 'stoppedOnString' }),
    new TableHeaderModel({ name: 'Updated By', orderColumnName: 'UpdatedBy', fieldValue: 'updatedBy' }),
    new TableHeaderModel({ name: 'Reason', orderColumnName: 'Reason', fieldValue: 'reason' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-file',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static prospectByStatusTableHeaders: TableHeader[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'DateOfBirth', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Advocate', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({ name: 'Status Code', orderColumnName: 'Status', fieldValue: 'patientStatus' }),
    new TableHeaderModel({ name: 'SubStatus', orderColumnName: 'SubStatus', fieldValue: 'subStatusDescription' }),
    new TableHeaderModel({ name: 'Date Created', orderColumnName: 'DateCreated', fieldValue: 'dateCreatedString' }),
    new TableHeaderModel({ name: 'Last Contact', orderColumnName: 'LastContact', fieldValue: 'lastContactString' }),
    new TableHeaderModel({ name: 'Insurance', orderColumnName: 'InsuranceCompany', fieldValue: 'insurance' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [
        {
          actionName: 'Patient record',
          icon: 'fa fa-file',
          tooltip: 'Patient record',
          class: 'text-warning',
        },
      ],
    }),
  ];

  static preDLetterSentTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'Name', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'DateOfBirth', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Status Code', orderColumnName: 'Status', fieldValue: 'patientStatus' }),
    new TableHeaderModel({ name: 'First Visit Date', orderColumnName: 'FirstVisit', fieldValue: 'firstVisitString' }),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'Surgeon', fieldValue: 'surgeonName' }),
    new TableHeaderModel({ name: 'Navigator', orderColumnName: 'Advocate', fieldValue: 'advocateName' }),
    new TableHeaderModel({ name: 'Insurance', orderColumnName: 'InsuranceCompany', fieldValue: 'insurance' }),
    new TableHeaderModel({ name: 'Pre_D Sent On', orderColumnName: 'PreDSentOn', fieldValue: 'preDSentOnString' }),
    new TableHeaderModel({ name: 'Pre_D Status', orderColumnName: 'PreDStatus', fieldValue: 'preDStatus' }),
    new TableHeaderModel({ name: 'Pre_D Status On', orderColumnName: 'PreDStatusOn', fieldValue: 'preDStatusOnString' }),
    new TableHeaderModel({ name: 'Action',
    customActions: [{
      actionName: 'Patient record',
      icon: 'fa fa-file',
      tooltip: 'Patient record',
      class: 'text-warning',
    }]}),
  ];

  static countByStatusTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'status' }),
    new TableHeaderModel({ name: 'SubStatus', orderColumnName: 'SubStatus', fieldValue: 'subStatus' }),
    new TableHeaderModel({ name: 'Status on', orderColumnName: 'StatusOn', fieldValue: 'statusOnCount' }),
    new TableHeaderModel({ name: 'Status on', orderColumnName: 'StatusOnTo', fieldValue: 'statusOnToCount' }),
    new TableHeaderModel({ name: 'Had status during date range', orderColumnName: 'HadStatusDuringRange', fieldValue: 'hadStatusDuringRangeCount' }),
    new TableHeaderModel({ name: 'Got status during date range', orderColumnName: 'GotStatusDuringRange', fieldValue: 'gotStatusDuringRangeCount' }),
    new TableHeaderModel({ name: 'Action',
    customActions: [{
      actionName: 'Count Details',
      icon: 'fa fa-search',
      tooltip: 'Count Details',
      class: 'text-info',
    }]}),
  ];

  static postOpClassTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'First Name', orderColumnName: 'FirstName', fieldValue: 'firstName' }),
    new TableHeaderModel({ name: 'Last Name', orderColumnName: 'LastName', fieldValue: 'lastName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'BirthDate', fieldValue: 'birthDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Status', orderColumnName: 'Status', fieldValue: 'status' }),
    new TableHeaderModel({ name: 'Pre-Op Class', orderColumnName: 'PreOpClassDate', fieldValue: 'preOpClassDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Post-Op Class', orderColumnName: 'PostOpClassDate', fieldValue: 'postOpClassDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({
      name: 'Action',
      customActions: [{
        actionName: 'Details',
        icon: 'fa fa-pencil-square-o',
        tooltip: 'Details',
        class: 'text-primary',
      }]
    }),
  ];

  static handoutStatusTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Name', orderColumnName: 'PatientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'Title', orderColumnName: 'Title', fieldValue: 'title' }),
    new TableHeaderModel({ name: 'Date Assigned', orderColumnName: 'AssignedDate', fieldValue: 'assignedDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Assigned By', orderColumnName: 'AssignedBy', fieldValue: 'assignedBy' }),
    new TableHeaderModel({ name: 'Opened', orderColumnName: 'Opened', fieldValue: 'opened' }),
    new TableHeaderModel({ name: 'Completed', orderColumnName: 'Completed', fieldValue: 'completed' }),
    new TableHeaderModel({ name: 'Completed On', orderColumnName: 'CompletedOn', fieldValue: 'completedOn', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
    new TableHeaderModel({ name: 'Action',
    customActions: [{
      actionName: 'Details',
      icon: 'fa fa-file',
      tooltip: 'Patient Details',
      class: 'text-warning',
    }]}),
  ];

  static workflowEfficiencySurgeonSummaryTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon' }),
    new TableHeaderModel({ name: 'Days to First Visit', orderColumnName: 'daysToFirstVisit', fieldValue: 'daysToFirstVisit' }),
    new TableHeaderModel({ name: 'Days to Clearance', orderColumnName: 'daysToClearance', fieldValue: 'daysToClearance'}),
    new TableHeaderModel({ name: 'Days to PreOp', orderColumnName: 'daysToPreOp', fieldValue: 'daysToPreOp' }),
    new TableHeaderModel({ name: 'Days to Surgery', orderColumnName: 'daysToSurgery', fieldValue: 'daysToSurgery' }),
    new TableHeaderModel({ name: '# Patients', orderColumnName: 'patientsAmount', fieldValue: 'patientsAmount' }),
  ];

  static workflowEfficiencyInsCoSummaryTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Payer', orderColumnName: 'payer', fieldValue: 'payer' }),
    new TableHeaderModel({ name: 'Days to First Visit', orderColumnName: 'daysToFirstVisit', fieldValue: 'daysToFirstVisit' }),
    new TableHeaderModel({ name: 'Days to Clearance', orderColumnName: 'daysToClearance', fieldValue: 'daysToClearance'}),
    new TableHeaderModel({ name: 'Days to PreOp', orderColumnName: 'daysToPreOp', fieldValue: 'daysToPreOp' }),
    new TableHeaderModel({ name: 'Days to Surgery', orderColumnName: 'daysToSurgery', fieldValue: 'daysToSurgery' }),
    new TableHeaderModel({ name: '# Patients', orderColumnName: 'patientsAmount', fieldValue: 'patientsAmount' }),
  ];

  static workflowEfficiencyDetailsTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon' }),
    new TableHeaderModel({ name: 'Insurance Type', orderColumnName: 'insuranceType', fieldValue: 'insuranceType' }),
    new TableHeaderModel({ name: 'Insurance Co', orderColumnName: 'insuranceCo', fieldValue: 'insuranceCo' }),
    new TableHeaderModel({ name: 'Prospect Since', orderColumnName: 'prospectSince', fieldValue: 'prospectSince', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy'}),
    new TableHeaderModel({ name: 'Consult. Date', orderColumnName: 'consultDate', fieldValue: 'consultDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy', hide: true}),
    new TableHeaderModel({ name: 'Days To First Visit', orderColumnName: 'daysToFirstVisit', fieldValue: 'daysToFirstVisit' }),
    new TableHeaderModel({ name: 'Days to Clearance', orderColumnName: 'daysToClearance', fieldValue: 'daysToClearance' }),
    new TableHeaderModel({ name: 'Days to PreOp', orderColumnName: 'daysToPreOp', fieldValue: 'daysToPreOp' }),
    new TableHeaderModel({ name: 'Days to Surgery', orderColumnName: 'daysToSurgery', fieldValue: 'daysToSurgery' }),
    new TableHeaderModel({ name: 'Patient Name', orderColumnName: 'patientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'birthDate', fieldValue: 'birthDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
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

  static plannedSurgeriesTableHeaders: TableHeaderModel[] = [
    new TableHeaderModel({ name: 'Patient Name', orderColumnName: 'patientName', fieldValue: 'patientName' }),
    new TableHeaderModel({ name: 'MRN', orderColumnName: 'accountNumber', fieldValue: 'accountNumber' }),
    new TableHeaderModel({ name: 'DOB', orderColumnName: 'birthDate', fieldValue: 'birthDateString' }),
    new TableHeaderModel({ name: 'Age', orderColumnName: 'patientAge', fieldValue: 'patientAge'}),
    new TableHeaderModel({ name: 'PCP', orderColumnName: 'pcpName', fieldValue: 'pcpName'}),
    new TableHeaderModel({ name: 'Surgeon', orderColumnName: 'surgeon', fieldValue: 'surgeon' }),
    new TableHeaderModel({ name: 'Procedure', orderColumnName: 'procedureName', fieldValue: 'procedureName' }),
    new TableHeaderModel({ name: 'Surgery Date', orderColumnName: 'tentativeDate', fieldValue: 'tentativeDate', pipe: DatePipe, pipeArgs: 'dd/MM/yyyy' }),
  ];
}
