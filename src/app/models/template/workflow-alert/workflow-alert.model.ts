import {IsNotEmpty} from 'class-validator';
export class WorkflowAlertModel {
    id: number;
    @IsNotEmpty({message: 'Name is required'})
    name: string;
    @IsNotEmpty({message: 'Description is required'})
    description: string;
    @IsNotEmpty({message: 'Interval is required'})
    whenInterval: number;
    whenIntervalType: string = 'C';
    whenIntervalMax: number;
    @IsNotEmpty({message: 'Interval Starting Point Required'})
    whenCondition: string = '';
    whenStatusCode: string = '';
    whenRule: number = 0;
    whenSurgery: string;
    whenVisitType: string;
    ifCondition: string = '';
    ifStatusCodes: string = '';
    if2Operator: string = '';
    if2Condition: string = '';
    if2StatusCodes: string = '';
    if3Operator: string = '';
    if3Condition: string = '';
    if3StatusCodes: string = '';
    ruleMethod: string = 'A';
    alertStaff1: string = '';
    alertStaff2: string = '';
    changeStatusTo: string = '';
    escalateAfter: number;
    escalateIntervalType: string = 'C';
    alternateEmail: string;
    escalateTo: string = '';
    escalateTo2: string = '';
    thisSurgeonOnly: string;
    includeExcludeSurgeon: string = '';
    noAlertAssignment: boolean;
    ifInsuranceCo: string;
    if2InsuranceCo: string;
    if3InsuranceCo: string;
    ifIncludeTag: string;
    ifExcludeTag: string;
    if2IncludeTag: string;
    if2ExcludeTag: string;
    if3IncludeTag: string;
    if3ExcludeTag: string;
    templateId: number = 0;
    bucketId: number = 0;
    handoutId: number = 0;

    selectedInsCo1: string[];
    selectedInsCo2: string[];
    selectedInsCo3: string[];

    selectedIfIncludeTag: string[];
    selectedIf2IncludeTag: string[];
    selectedIf3IncludeTag: string[];

    selectedIfExcludeTag: string[];
    selectedIf2ExcludeTag: string[];
    selectedIf3ExcludeTag: string[];

    selectedWhenVisitTypes: string[];
    selectedWhenSurgery: string[];
}
