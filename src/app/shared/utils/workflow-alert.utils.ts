import { StatusModel } from 'src/app/models/practice/status.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';
import { MethodOption, TableHeader } from 'src/types/types';

export const whenAfterConditions: { value: string; name: string, displayName?: string }[] = [
  { value: '', name: '-- select one --' },
  { value: 'LC', name: 'Lead Creation'},
  { value: 'CT1', name: 'First Contact w/ Lead'},
  { value: 'ACCT', name: 'User Account Created'},
  { value: 'V1', name: 'First Visit' },
  { value: 'IC1', name: 'Initial Consult' },
  { value: 'APPT', name: 'Appointment' },
  { value: 'VSIT', name: 'Visit' },
  { value: 'Stat', name: 'Status Code Assigned', displayName: 'Status Code Set to' },
  { value: 'TSUR', name: 'Tentative Surgery' },
  { value: 'SURG', name: 'Actual Surgery', displayName: 'Surgery' },
  { value: 'RULE', name: 'Rule Triggered' },
  { value: 'HSC', name: 'Homework Sheet Created' },
  { value: 'HSPP', name: 'Homework Sheet Posted to Patient' },
  { value: 'HSE', name: 'Homework Sheet Completed' },
  { value: 'HSLU', name: 'Homework Sheet Last Update' },
  { value: 'HSBW', name: 'Blood work ordered' },
  { value: 'HSPE', name: 'Psych eval ordered' },
  { value: 'HSSS', name: 'Sleep study ordered' },
  { value: 'HSCC', name: 'Cardiology clearance ordered' },
  { value: 'HSPC', name: 'Pulmonary clearance ordered' },
  { value: 'HSMC', name: 'Medical clearance ordered' },
  { value: 'HSSD', name: 'Supervised diet ordered' },
  { value: 'HSMR', name: 'Medical Records ordered', displayName: 'Medical Records' },
  { value: 'HSAS', name: 'Additional study ordered' },
  { value: 'HSAC', name: 'Additional clearance ordered' },
  { value: 'HSAR', name: 'Additional requirement ordered' },
];

export const ifConditions: { value: string; name: string, displayName?: string }[] = [
  { value: '', name: '-- select one --', displayName: '' },
  { value: 'ACTLD', name: 'Active Lead' },
  { value: 'INACL', name: 'Inactive Lead' },
  { value: 'NOCLD', name: 'No contact w/ lead' },
  { value: 'NOCTL', name: 'No contact w/ lead in last' },
  { value: 'NOTPT', name: 'Not a Patient' },
  { value: 'V0', name: 'No Visit' },
  { value: 'NOFA', name: 'No Future Appointment' },
  { value: 'NoSurg', name: 'No Surgery' },
  { value: 'HASCP', name: 'Has Sx Complication' },
  { value: 'NOCP', name: 'No Sx Complication' },
  { value: 'NOACP', name: 'No Ongoing Sx Complication' },
  { value: 'Stat', name: 'Current Status Code =', displayName: 'Current Status Code' },
  { value: 'ITAG', name: 'Has Tag', displayName: '' },
  { value: 'ETAG', name: 'Does not have Tag', displayName: '' },
  { value: 'NOACT', name: 'No User Account' },
  { value: 'HSACT', name: 'Has User Account' },
  { value: 'IRINC', name: 'I&R Not Completed' },
  { value: 'IRCPL', name: 'I&R Completed' },
  { value: 'INSCO', name: 'Insurance Company', displayName: '' },
  { value: 'HWNC', name: 'Homework not created' },
  { value: 'HWINC', name: 'Homework not completed' },
  { value: 'HWP1', name: 'Homework 1 item pending' },
  { value: 'HWP2', name: 'Homework 2 items pending' },
  { value: 'HWP12', name: 'Homework 1 or 2 items pending' },
  { value: 'HSBW', name: 'Blood work not reviewed' },
  { value: 'HSPE', name: 'Psych eval not reviewed' },
  { value: 'HSSS', name: 'Sleep study not reviewed' },
  { value: 'HSCC', name: 'Cardiology clearance not reviewed' },
  { value: 'HSPC', name: 'Pulmonary clearance not reviewed' },
  { value: 'HSMC', name: 'Medical clearance not reviewed' },
  { value: 'HSSD', name: 'Supervised diet not reviewed' },
  { value: 'HSMR', name: 'Medical Records not reviewed' },
  { value: 'HSAS', name: 'Additional study not reviewed' },
  { value: 'HSAC', name: 'Additional clearance not reviewed' },
  { value: 'HSAR', name: 'Additional requirement not reviewed' },
];

export const methodOptions: MethodOption[] = [
  { value: 'A', methodId: 'alertOption', name: 'Alert', text: ' workflow alert ' },
  { value: 'I', methodId: 'internalOption', name: 'Internal', text: ' internal message to patient ' },
  { value: 'E', methodId: 'emailOption', name: 'Email', text: ' Email to patient ' },
  { value: 'S', methodId: 'smsOption', name: 'SMS', text: ' SMS ' },
  { value: 'N', methodId: 'assignmentOption', text: ' Assignment Change ' },
  { value: 'H', methodId: 'handoutOption', text: ' Handout Assignment' },
];

export const getIfCondition = (condition: string) => {
  const selectedIfCondition = ifConditions.find(x => x.value === condition);
  return selectedIfCondition?.displayName ?? selectedIfCondition?.name ?? '';
};

export const getIf1Rule = (
  workflowAlert: WorkflowAlertModel,
  statusCodesList: StatusModel[]
): string => {
  let ifRule = '';
  if (
    (workflowAlert?.ifCondition === 'Stat' ||
      workflowAlert?.ifCondition === 'StatN') &&
    workflowAlert.ifCondition?.length > 0
  ) {
    let selectedStatus =
      workflowAlert.ifStatusCodes.indexOf('|') === -1
        ? statusCodesList.find(
            (x) => x.id === parseInt(workflowAlert.ifStatusCodes)
          )
        : statusCodesList.find(
            (x) => x.combinedStatus === workflowAlert.ifStatusCodes
          );
    ifRule += selectedStatus != null ? ' = ' + selectedStatus.description : '';
  }
  if (
    workflowAlert?.ifCondition === 'NOCTL' &&
    workflowAlert?.ifStatusCodes?.length > 0
  ) {
    ifRule += ' ' + workflowAlert.ifStatusCodes + ' days';
  }
  if (
    workflowAlert.whenCondition === 'INSCO' &&
    workflowAlert?.ifInsuranceCo?.length > 0
  ) {
    ifRule +=
      'having insurance(s) ' +
      workflowAlert.ifInsuranceCo
        .substring(0, workflowAlert.ifInsuranceCo.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.whenCondition === 'ITAG' &&
    workflowAlert?.ifIncludeTag?.length > 0
  ) {
    ifRule +=
      'having tag(s) ' +
      workflowAlert.ifIncludeTag
        .substring(0, workflowAlert.ifIncludeTag.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.whenCondition === 'ETAG' &&
    workflowAlert?.ifExcludeTag?.length > 0
  ) {
    ifRule +=
      'not having tag(s) ' +
      workflowAlert.ifExcludeTag
        .substring(0, workflowAlert.ifExcludeTag.length - 1)
        .replace('|', ', ');
  }
  return ifRule;
};

export const getIf2Rule = (
  workflowAlert: WorkflowAlertModel,
  statusCodesList: StatusModel[]
): string => {
  let ifRule = '';
  if (
    workflowAlert?.if2Condition === 'Stat' &&
    workflowAlert.if2StatusCodes?.length > 0
  ) {
    let selectedStatus =
      workflowAlert.if2StatusCodes.indexOf('|') === -1
        ? statusCodesList.find(
            (x) => x.id === parseInt(workflowAlert.if2StatusCodes)
          )
        : statusCodesList.find(
            (x) => x.combinedStatus === workflowAlert.if2StatusCodes
          );
    ifRule += selectedStatus != null ? ' = ' + selectedStatus.description : '';
  }
  if (
    workflowAlert?.if2Condition === 'NOCTL' &&
    workflowAlert?.if2StatusCodes?.length > 0
  ) {
    ifRule += ' ' + workflowAlert.ifStatusCodes + ' days';
  }
  if (
    workflowAlert.if2Condition === 'INSCO' &&
    workflowAlert?.if2InsuranceCo?.length > 0
  ) {
    ifRule +=
      'having insurance(s) ' +
      workflowAlert.if2InsuranceCo
        .substring(0, workflowAlert.if2InsuranceCo.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.if2Condition === 'ITAG' &&
    workflowAlert?.if2IncludeTag?.length > 0
  ) {
    ifRule +=
      'having tag(s) ' +
      workflowAlert.if2IncludeTag
        .substring(0, workflowAlert.if2IncludeTag.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.if2Condition === 'ETAG' &&
    workflowAlert?.if2ExcludeTag?.length > 0
  ) {
    ifRule +=
      'not having tag(s) ' +
      workflowAlert.if2ExcludeTag
        .substring(0, workflowAlert.if2ExcludeTag.length - 1)
        .replace('|', ', ');
  }
  return ifRule;
};

export const getIf3Rule = (
  workflowAlert: WorkflowAlertModel,
  statusCodesList: StatusModel[]
): string => {
  let ifRule = '';
  if (
    workflowAlert?.if3Condition === 'Stat' &&
    workflowAlert.if3StatusCodes?.length > 0
  ) {
    let selectedStatus =
      workflowAlert.if3StatusCodes.indexOf('|') === -1
        ? statusCodesList.find(
            (x) => x.id === parseInt(workflowAlert.if3StatusCodes)
          )
        : statusCodesList.find(
            (x) => x.combinedStatus === workflowAlert.if3StatusCodes
          );
    ifRule += selectedStatus != null ? ' = ' + selectedStatus.description : '';
  }
  if (
    workflowAlert?.if3Condition === 'NOCTL' &&
    workflowAlert?.if3StatusCodes?.length > 0
  ) {
    ifRule += ' ' + workflowAlert.if3StatusCodes + ' days';
  }
  if (
    workflowAlert.if3Condition === 'INSCO' &&
    workflowAlert?.if3InsuranceCo?.length > 0
  ) {
    ifRule +=
      'having insurance(s) ' +
      workflowAlert.if3InsuranceCo
        .substring(0, workflowAlert.if3InsuranceCo.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.if3Condition === 'ITAG' &&
    workflowAlert?.if3IncludeTag?.length > 0
  ) {
    ifRule +=
      'having tag(s) ' +
      workflowAlert.if3IncludeTag
        .substring(0, workflowAlert.if3IncludeTag.length - 1)
        .replace('|', ', ');
  }
  if (
    workflowAlert.if3Condition === 'ETAG' &&
    workflowAlert?.if3ExcludeTag?.length > 0
  ) {
    ifRule +=
      'having tag(s) ' +
      workflowAlert.if3ExcludeTag
        .substring(0, workflowAlert.if3ExcludeTag.length - 1)
        .replace('|', ', ');
  }
  return ifRule;
};

export const tableHeaders: TableHeader[] = [
  {
    name: 'Name',
    fieldValue: 'name',
  },
  {
    name: 'Description',
    fieldValue: 'description',
  },
  {
    name: 'Method',
    fieldValue: 'ruleMethod',
  },
  {
    name: 'Action',
    applyCanSaveSettingsDirective: true,
    tooltip: true
  },
];

export const getIfStatus = (firstStatusToFilter: string, secondStatusToFilter: string) => {
  let nonSelectedStatusCodes = ifConditions;
  if (firstStatusToFilter){
    nonSelectedStatusCodes = nonSelectedStatusCodes.filter(x => x.value !== firstStatusToFilter);
  }
  if (secondStatusToFilter){
    nonSelectedStatusCodes = nonSelectedStatusCodes.filter(x => x.value !== secondStatusToFilter);
  }
  return nonSelectedStatusCodes;
}
