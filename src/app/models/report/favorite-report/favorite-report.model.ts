import { FavoriteReportParamModel } from "./favorite-report-params.model";

export class FavoriteReportModel {
  id: number;
  title: string;
  userId: string;
  link: string;
  params: FavoriteReportParamModel[] = [];
  isReportValid = true;

  constructor(reportsLink = '') {
    this.link = reportsLink;
  }
}
