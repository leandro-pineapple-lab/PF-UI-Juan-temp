export class HomeworkCategoryDetailModel {
    id: number;
    formItemId: number;
    itemDescription: string;
    itemHeader: string;
    itemOptions: string;
    itemTrailer: string;
    itemType: string;
    name: string;
    activeInd: boolean;
    box2Format: string;
    answer: string;
    answer2: string;
    selected: boolean;
    dueDate: Date;
    checkboxList: any [] = [];
}