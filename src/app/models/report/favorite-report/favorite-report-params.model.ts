export class FavoriteReportParamModel {
  id: number;
  reportId: number;
  key: string;
  description: string;
  value: string;
  displayValue?: string;
  changeValueTo?: string = '';
}
