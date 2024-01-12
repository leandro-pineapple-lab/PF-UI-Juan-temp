import { BasePagingModel } from "./base-paging.model";

export class LocalPagingModel extends BasePagingModel {
  data: any[] = [];

  override calculatePaging(){
    this.totalNumberOfRecords = this.data.length;
    super.calculatePaging();
    this.sort();
  }

  sort(array: any[] = []){
    if (this.orderBy && this.orderDirection) {
      this.sortArray(array.length > 0 ? array : this.data);
    }
  }

  private sortArray(array: any[] = []){
    array.sort((a, b) => {
      const aValue = a[this.orderBy];
      const bValue = b[this.orderBy];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return this.orderDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return this.orderDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      return 0;
    });
  }
}
