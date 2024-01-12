import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { createMask } from '@ngneat/input-mask';
import $ from 'jquery';
import { DatePipe } from '@angular/common';
import { FileSaverService } from 'ngx-filesaver';
import { ActivatedRoute } from '@angular/router';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { PatientFilterModel } from 'src/app/models/patient/patientFilter.model';
import { PatientService } from 'src/app/services/patient/patient.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';

@Component({
  selector: 'app-search-prospect',
  templateUrl: './search-prospect.component.html',
  styleUrls: ['./search-prospect.component.scss']
})
export class SearchProspectComponent implements OnInit {

  filtersCollapsed: boolean = true;
  statusCollapsed: boolean = true;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  advocates: any[] = [];
  surgeons: any[] = [];
  offices: any[] = [];
  serviceLines: any[] = [];
  leadTypes: any[] = [];
  leadSources: any[] = [];
  insuranceCompanies: any[] = [];
  statuses: any[] = [];
  patientsList: any[] = [];
  patientFilters: PatientFilterModel = new PatientFilterModel();
  isNameVisible: boolean = true;
  isDOBVisible: boolean = true;
  isStatusVisible: boolean = true;
  isLastEncounterVisible: boolean = true;
  isActionVisible: boolean = true;
  isWhatsNextVisible: boolean = true;
  isDueDateVisible: boolean = true;
  isAssignedToVisible: boolean = true;
  isAdvocateVisible: boolean = true;
  isDueDateSortVisible: boolean = false;
  isLastEncounterSortVisible: boolean = false;
  pagination: PagingModel = new PagingModel();
  maxSize: number = 10;
  tooltipLeft: string = 'left';
  phoneMask = createMask<string>('999-999-9999');
  showingFrom = 1;
  showingTo = this.pagination.tableSize;
  showPatientLeadsTable: boolean = true;
  patientsFound: boolean = true;
  excelHelper: any = null;

  constructor(private patientService: PatientService, private elementRef: ElementRef, private datePipe: DatePipe, private fileSaver: FileSaverService, private route: ActivatedRoute) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'white';
  }

  async ngOnInit() {
    await this.getPatientFilters();
    await this.route.queryParams.subscribe(params => {
      this.patientFilters.lastName = params['last_name'] || "";
      this.patientFilters.insuranceCompany = params['ins']?.toString() || "";
      this.patientFilters.groupNumber = params['group_number'] || "";
      if ((this.patientFilters.insuranceCompany && this.patientFilters.insuranceCompany.length > 0) ||
          (this.patientFilters.groupNumber && this.patientFilters.groupNumber.length > 0)){
            this.filtersCollapsed = false;
            $('#criteriaCardBody').removeClass('collapse');
      }
      this.getPatients();
    });
  }

  getPatientFilters(){
    this.patientService.getPatientFilters().subscribe({
      next: (response: any) => {
        if (response.object != null) {
          this.advocates = response.object.advocates;
          this.surgeons = response.object.surgeons;
          this.offices = response.object.offices;
          this.leadTypes = response.object.leadTypes;
          this.leadSources = response.object.leadSources;
          this.serviceLines = response.object.serviceLines;
          this.insuranceCompanies = response.object.insuranceCompanies;
          this.statuses = response.object.statuses;
          this.patientFilters.statuses = this.statuses.map(s => {
            return {
              id: s.id,
              description: s.description,
              name: s.name,
              selected: false
            }
          });
        }
      }
    });
  }

  async search(){
    if (this.patientFilters.hasFilters()){
      this.pagination = new PagingModel();
    }

    this.getPatients();
  }

  getPatients() {
    (this.patientFilters.phone as any) = $('#txtPhoneSearch').val() != null && $('#txtPhoneSearch').val() != '' && $('#txtPhoneSearch').val() != undefined ?
                                          $('#txtPhoneSearch').val() : '';
    this.patientService.getPatients(this.pagination, this.patientFilters).subscribe({
      next: (response: any) => {
        if (response.results != null && response.results.length > 0) {
          this.patientsList = response.results;
          this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
          this.patientsFound = true;
          this.showPatientLeadsTable = true;
          this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ? this.pagination.totalNumberOfRecords :
                            (this.pagination.page * this.pagination.tableSize);
        }else{
          this.showPatientLeadsTable = false;
          this.patientsFound = false;
        }
      }
    });
  }

  clearCriteria(){
    this.patientFilters = new PatientFilterModel(this.statuses);
  }

  async onTableDataChange(event: any) {
    this.showingTo = (event * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (event * this.pagination.tableSize);
    this.showingFrom = event == 1 ? 1 : ((event - 1) * (this.pagination.tableSize)) + 1;
    this.pagination.page = event;
    await this.getPatients();
  }

  async onTableSizeChange(event: any) {
    this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (this.pagination.page * this.pagination.tableSize);
    this.showingFrom = this.pagination.page == 1 ? 1 : ((this.pagination.page - 1) * (this.pagination.tableSize)) + 1;
    await this.getPatients();
  }

  async exportExcel(){
    this.patientFilters.allResults = true;
    (await this.patientService.getPatients(this.pagination, this.patientFilters)).subscribe({
      next: (response: any) => {
        if (response.results != null && response.results.length > 0) {
          const patients = response.results.map((pat: any) => {
            return {
              "Name": pat.fullName,
              "DOB": pat.dateOfBirth,
              "Status": pat.status,
              "LastEncounter": this.datePipe.transform(pat.lastEncounterDate, 'M/dd/yyyy'),
              "What's Next": pat.whatsNext,
              "Due Date": pat.dueDate,
              "Assigned To": pat.assignedTo,
              "Advocate": pat.advocate,
            }
          });
          this.patientFilters.allResults = false;
          this.excelHelper.exportToExcel(patients, 'Search Prospects', ["Name", "DOB", "Status", "LastEncounter", "What's Next", "Due Date", "Assigned To", "Advocate"]);
        }
      },
      error: (e: any) => {
        this.showErrorMessage = true;
        this.errorMessage = e.error;
        this.patientFilters.allResults = false;
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
    await this.getPatients();
  }

}
