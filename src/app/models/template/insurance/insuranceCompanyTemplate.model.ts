import { InsuranceCompanyModel } from "../../practice/insurance-company.model";
import { AllowableModel } from "./allowable.model";
import { CoverageModel } from "./coverage.model";
import { RequirementModel } from "./requirement.model";

export class InsuranceCompanyTemplateModel {
    id: number;
    description: string = '';
    payer: string = '';
    groupNumber: string = '';
    planType: string = '';
    showCoverageCheckIcon: boolean = false;
    showRequirementsCheckIcon: boolean = false;
    showAllowablesCheckIcon: boolean = false;
    insuranceCompany: InsuranceCompanyModel = new InsuranceCompanyModel();
    coverage: CoverageModel = new CoverageModel();
    allowable: AllowableModel = new AllowableModel();
    requirements: RequirementModel[];
}