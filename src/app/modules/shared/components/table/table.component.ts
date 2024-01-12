import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { TableModel } from 'src/app/models/common/table/table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {

  selectedElement: any;

  @Input()
  tableInfo: TableModel;
  @Input()
  headerCssClass = 'table-dark';
  @Input()
  pagination: PagingModel | LocalPagingModel;
  @Input()
  tooltipTemplate: any;
  @Input()
  showDefaultActions = true;
  @Input()
  showExcelAndColumnsVisibilityActions = false;
  @Input()
  showDeleteModalOnParent = false;
  @Input()
  actionsWidth = 90;
  @Input()
  noDataFoundText = 'No elements found';
  @Input()
  showAlert = true;

  @Output()
  deleteEvent: EventEmitter<number> = new EventEmitter();
  @Output()
  editEvent: EventEmitter<any> = new EventEmitter();
  @Output()
  selectedItemToDeleteEvent: EventEmitter<any> = new EventEmitter();
  @Output() tooltipActive = new EventEmitter<any>();
  @Output() customActionEvent = new EventEmitter<any>();
  @Output() paginationChangeEvent = new EventEmitter();
  @Output() exportExcelEvent = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableInfo']?.currentValue.data){
      if (this.pagination instanceof LocalPagingModel){
        this.pagination.data = this.tableInfo.data;
        this.pagination.sort();
      }
      this.pagination.calculatePaging();
    }
  }

  ngOnInit(): void {
  }

  onTooltipActive(item: any) {
    this.tooltipActive.emit(item);
  }

  openDeleteModal(deleteModal: any, selectedElementToDelete: any) {
    this.selectedElement = selectedElementToDelete;
    if (!this.showDeleteModalOnParent){
      this.modalService.open(deleteModal, { ariaLabelledBy: 'modal-basic-title' });
    }else{
      this.selectedItemToDeleteEvent.emit(this.selectedElement);
    }
  }

  deleteElement(){
    this.deleteEvent.emit(this.selectedElement.id);
  }

  editItem(item: any){
    this.editEvent.emit(item);
  }

  customAction(item: any){
    this.customActionEvent.emit(item);
    this.modalService.dismissAll();
  }

  triggerCustomAction(action: string, item: any){
    this.customActionEvent.emit({action, item});
  }

  isDate(item: any) {
    return item instanceof Date;
  }

  async onTableDataChange(event: number) {
    this.pagination.tableDataChange(event);
    if (this.pagination instanceof LocalPagingModel){
      this.tableInfo.data = this.pagination.data;
      return;
    }
    this.paginationChangeEvent.emit();
  }

  async onTableSizeChange() {
    this.pagination.tableSizeChange();
    if (this.pagination instanceof LocalPagingModel){
      this.tableInfo.data = this.pagination.data;
      return;
    }
    this.paginationChangeEvent.emit();
  }

  async orderBy(columnName: string) {
    this.pagination.orderBy = columnName;
    this.pagination.orderDirection = this.pagination.orderDirection === "asc" ? "desc" : "asc";
    if (this.pagination instanceof LocalPagingModel){
      this.pagination.sort();
    }
    this.paginationChangeEvent.emit();
  }

  exportExcel(){
    if (this.pagination){
      this.pagination.allResults = true;
    }
    this.exportExcelEvent.emit();
  }

}
