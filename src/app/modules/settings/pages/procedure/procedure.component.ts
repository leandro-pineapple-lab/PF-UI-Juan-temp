import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { ProcedureService } from 'src/app/services/procedure/procedure.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';

@Component({
  selector: 'app-procedure',
  templateUrl: './procedure.component.html',
  styleUrls: ['./procedure.component.scss']
})
export class SettingsProcedureComponent implements OnInit {

  proceduresList: ProcedureModel[] = [];
  selectedProcedure: ProcedureModel = new ProcedureModel();
  newProcedure: ProcedureModel = new ProcedureModel();
  pagination: PagingModel = new PagingModel();
  excelHelper: any = null;
  closeResult: string = '';
  nameFilter: string = '';

  constructor(private procedureService: ProcedureService, private toastr: ToastrService, private fileSaver: FileSaverService, private modalService: NgbModal) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  async ngOnInit() {
    await this.getProcedures();
  }

  async getProcedures() {
    (await this.procedureService.getProcedures(this.pagination, this.nameFilter)).subscribe({
      next: (response: any) => {
        if (response != null && response.results.length > 0) {
          this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
          this.proceduresList = response.results;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getPage(page: number) {
    this.pagination.page = page;
    await this.getProcedures();
  }

  async onTableSizeChange(event: any) {
    await this.getProcedures();
  }

  async exportExcel(){
    (await this.procedureService.getProcedures(this.pagination, '', true)).subscribe({
      next: (response: any) => {
        if (response.results != null && response.results.length > 0) {
          const procedures = response.results.map((proc: any) => {
            return {
              "Name": proc.name,
              "CPT Code": proc.cptCode,
              "Procedure Type": proc.category,
              "SubType": proc.subCategory,
              "Pos-op reminder": proc.posOpReminder ? "Yes" : "No",
              "Show On Intake": proc.showOnIntake ? "Yes" : "No",
            }
          });
          this.excelHelper.exportToExcel(procedures, 'Settings Procedures', ["Name", "CPT Code", "Procedure Type", "SubType", "Pos-op reminder", "Show On Intake"]);
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addProcedure(){
    if (!this.newProcedure.isValid()) {
      this.toastr.error('Please fill all the required fields', 'Error');
      return;
    }
    (await this.procedureService.addProcedure(this.newProcedure)).subscribe({
      next: (response: any) => {
          this.toastr.success('Procedure created successfully', 'Success');
          this.newProcedure = new ProcedureModel();
          this.getProcedures();
      },
      error: (e: any) => {
        if (e.error.errors && e.error.errors.Name){
          this.toastr.error(e.error.errors.Name, 'Error');
          return;
        }else{
          this.toastr.error(e.error, 'Error', { timeOut: 3000 });
        }
      }
    });
  }

  async orderBy(event: any, columnName: string) {
    this.pagination.orderByAsc = '';
    this.pagination.orderByDesc = '';
    var elements = document.getElementsByClassName('order-column');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] != event.srcElement && elements[i] != (event.srcElement.nextElementSibling || elements[i] != event.srcElement.previousElementSibling)) {
        elements[i].classList.remove('active-order-by');
      }
    }

    var containsActiveClass = false;
    if (event.srcElement.classList.contains('active-order-by')) {
      containsActiveClass = true;
      event.srcElement.classList.remove('active-order-by');
      if (event.srcElement.previousElementSibling != null && event.srcElement.previousElementSibling.classList.contains('order-column')) {
        event.srcElement.previousElementSibling.classList.add('active-order-by');
      }
      if (event.srcElement.nextElementSibling != null && event.srcElement.nextElementSibling.classList.contains('order-column')) {
        event.srcElement.nextElementSibling.classList.add('active-order-by');
      }
    }

    if (!containsActiveClass){
      if (!event.srcElement.classList.contains('active-order-by')) {
        event.srcElement.classList.add('active-order-by');
        if (event.srcElement.previousElementSibling != null &&
            event.srcElement.previousElementSibling.classList.contains('order-column') &&
            event.srcElement.previousElementSibling.classList.contains('active-order-by')) {
          event.srcElement.previousElementSibling.classList.remove('active-order-by');
        }
        if (event.srcElement.nextElementSibling != null &&
            event.srcElement.nextElementSibling.classList.contains('order-column') &&
            event.srcElement.nextElementSibling.classList.contains('active-order-by')) {
          event.srcElement.nextElementSibling.classList.remove('active-order-by');
        }
      }
    }

    var orderByElement = $('.active-order-by')[0];
    if (orderByElement.classList.contains('fa-arrow-down')) {
      this.pagination.orderByDesc = columnName;
    }
    if (orderByElement.classList.contains('fa-arrow-up')) {
      this.pagination.orderByAsc = columnName;
    }
    await this.getProcedures();
  }

  openDeleteProcedureConfirmationModal(procedureToDeleteModal: any, procedure: ProcedureModel) {
    this.selectedProcedure = procedure;
    this.modalService.open(procedureToDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateProcedureConfirmationModal(procedureToUpdateModal: any, procedure: ProcedureModel) {
    this.selectedProcedure = new ProcedureModel();
    this.selectedProcedure.name = procedure.name;
    this.selectedProcedure.cptCode = procedure.cptCode;
    this.selectedProcedure.category = procedure.category;
    this.selectedProcedure.subCategory = procedure.subCategory;
    this.selectedProcedure.postOpReminder = procedure.postOpReminder;
    this.selectedProcedure.showOnIntake = procedure.showOnIntake;
    this.selectedProcedure.previousCategory = procedure.category;
    this.selectedProcedure.previousName = procedure.name;
    this.selectedProcedure.category = procedure.category == 'NSP' ? 'D' : procedure.bariatricSurgery ? 'B' : 'G';
    this.modalService.open(procedureToUpdateModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async deleteProcedure(){
    (await this.procedureService.deleteProcedure(this.selectedProcedure)).subscribe({
      next: (response: any) => {
        this.getProcedures();
        this.toastr.success('Procedure successfully deleted.', 'Success');
        this.modalService.dismissAll();
        this.selectedProcedure = new ProcedureModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async updateProcedure(){
    if (!this.selectedProcedure.isValid()){
      this.selectedProcedure.showNameRequiredMessage = true;
      this.toastr.error('Please fill all the required fields', 'Error');
      return;
    }
    this.selectedProcedure.showNameRequiredMessage = false;
    (await this.procedureService.updateProcedure(this.selectedProcedure)).subscribe({
      next: (response: any) => {
        this.getProcedures();
        this.toastr.success('Procedure successfully updated.', 'Success');
        this.modalService.dismissAll();
        this.selectedProcedure = new ProcedureModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async search(){
    if (this.nameFilter.length > 0) {
      this.pagination = new PagingModel();
    }
    await this.getProcedures();
  }

}
