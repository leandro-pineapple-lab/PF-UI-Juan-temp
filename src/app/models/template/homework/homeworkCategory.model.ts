import { HomeworkCategoryDetailModel } from "./homeworkCategoryDetails.model";

export class HomeworkCategoryModel {
    id: number;
    name: string;
    seq: number;
    titleNote: string;
    folder: string;
    selected: boolean;
    isRowOpen: boolean;
    requirementText: string;
    active: boolean;
    homeworkCategoryDetails: HomeworkCategoryDetailModel[] = [];
}