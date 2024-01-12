import { SortDirection } from "src/types/paging.types";

export class BasePagingModel {
    page: number = 1;
    count: number = 0;
    tableSize: number = 10;
    tableSizes: any = [10, 25, 50, 100];
    orderByAsc: string = 'name';
    orderByDesc: string = '';
    orderDirection: SortDirection = "asc";
    orderBy: string = 'name';
    totalNumberOfRecords: number = 0;
    showingFrom = 1;
    showingTo = this.tableSize;
    allResults = false;
    id = '';

    constructor(id = 'paginationId') {
      this.id = id;
    }

    tableDataChange(event: number) {
      this.page = event;
      this.calculatePaging();
    }

    tableSizeChange() {
      this.page = 1;
      this.calculatePaging();
    }

    calculatePaging(){
      this.showingTo = (this.page * this.tableSize) > this.totalNumberOfRecords ? this.totalNumberOfRecords : (this.page * this.tableSize);
      this.showingFrom = this.page == 1 ? 1 : ((this.page - 1) * (this.tableSize)) + 1;
      if (this.showingFrom > this.showingTo){
        this.showingFrom = this.showingFrom - 1;
      }
    }
}
