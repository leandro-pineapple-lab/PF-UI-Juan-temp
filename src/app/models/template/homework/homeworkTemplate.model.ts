import { HomeworkCategoryModel } from "./homeworkCategory.model";

export class HomeworkTemplateModel {
    patientId: string;
    hospitalName: string;
    notes: string;
    modifiedDate: Date;
    modifiedBy: string;
    homeworkCategories: HomeworkCategoryModel[] = [];
}