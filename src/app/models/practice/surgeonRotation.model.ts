import { SurgeonModel } from "./surgeon.model";

export class SurgeonRotationModel {
    id: number;
    name: string = '';
    surgeonsList: SurgeonModel[] = [];
    showSelectedSurgeonErrorMessage: boolean = false;
}