import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { createMask } from '@ngneat/input-mask';
import { FileSaverService } from 'ngx-filesaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventFilterModel } from 'src/app/models/event/event-filter.model';
import { EventModel } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { InsuranceCompanyService } from 'src/app/services/insurance-company/insurance-company.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';

@Component({
  selector: 'app-support-group',
  templateUrl: './support-group.component.html',
  styleUrls: ['./support-group.component.scss']
})
export class SupportGroupComponent implements OnInit {
  supportGroupFilter: EventFilterModel = new EventFilterModel("G");
  newEvent: EventModel = new EventModel("G");
  selectedEvent: EventModel = new EventModel("G");
  eventsList: EventModel[] = [];
  presentersList: any[] = [];
  statesList: any[] = [];
  meridian = true;
  showEventAddBody: boolean = false;
  phoneMask = createMask<string>('999-999-9999');
  closeResult: string = "";
  excelHelper: any = null;
  orderByAsc: string = "date";
  orderByDesc: string = ""

  constructor(private eventService: EventService, private insuranceCompanyService: InsuranceCompanyService,
    private toastr: ToastrService, private modalService: NgbModal, private spinnerService: NgxSpinnerService, private fileSaver: FileSaverService,
    private datePipe: DatePipe) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  addEventForm = new UntypedFormGroup({
    addEventTitle: new UntypedFormControl("", [Validators.required]),
    addEventStatus: new UntypedFormControl("", [Validators.required]),
    addEventDate: new UntypedFormControl("", [Validators.required]),
    addEventLocation: new UntypedFormControl("", [Validators.required]),
    addEventAddress: new UntypedFormControl("", [Validators.required]),
    addEventCity: new UntypedFormControl("", [Validators.required]),
    addEventState: new UntypedFormControl("", [Validators.required]),
    addEventZip: new UntypedFormControl("", [Validators.required]),
    addEventCapacity: new UntypedFormControl("", [Validators.required]),
    addEventAddress2: new UntypedFormControl(""),
    addEventPhone: new UntypedFormControl(""),
    addEventDuration: new UntypedFormControl(""),
    addEventPresenter: new UntypedFormControl(""),
  });

  get addEventTitle()
  {
    return this.addEventForm.get("addEventTitle");
  }

  get addEventStatus()
  {
    return this.addEventForm.get("addEventStatus");
  }

  get addEventDate()
  {
    return this.addEventForm.get("addEventDate");
  }

  get addEventLocation()
  {
    return this.addEventForm.get("addEventLocation");
  }

  get addEventAddress()
  {
    return this.addEventForm.get("addEventAddress");
  }

  get addEventCity()
  {
    return this.addEventForm.get("addEventCity");
  }

  get addEventState()
  {
    return this.addEventForm.get("addEventState");
  }

  get addEventZip()
  {
    return this.addEventForm.get("addEventZip");
  }

  get addEventDuration()
  {
    return this.addEventForm.get("addEventDuration");
  }

  get addEventPresenter()
  {
    return this.addEventForm.get("addEventPresenter");
  }

  get addEventAddress2()
  {
    return this.addEventForm.get("addEventAddress2");
  }

  get addEventCapacity()
  {
    return this.addEventForm.get("addEventCapacity");
  }

  get addEventPhone()
  {
    return this.addEventForm.get("addEventPhone");
  }

  updateEventForm = new UntypedFormGroup({
    updateEventTitle: new UntypedFormControl("", [Validators.required]),
    updateEventStatus: new UntypedFormControl("", [Validators.required]),
    updateEventDate: new UntypedFormControl("", [Validators.required]),
    updateEventLocation: new UntypedFormControl("", [Validators.required]),
    updateEventAddress: new UntypedFormControl("", [Validators.required]),
    updateEventCity: new UntypedFormControl("", [Validators.required]),
    updateEventState: new UntypedFormControl("", [Validators.required]),
    updateEventZip: new UntypedFormControl("", [Validators.required]),
    updateEventCapacity: new UntypedFormControl("", [Validators.required]),
    updateEventAddress2: new UntypedFormControl(""),
    updateEventPhone: new UntypedFormControl(""),
    updateEventDuration: new UntypedFormControl(""),
    updateEventPresenter: new UntypedFormControl(""),
  });

  get updateEventTitle()
  {
    return this.updateEventForm.get("updateEventTitle");
  }

  get updateEventStatus()
  {
    return this.updateEventForm.get("updateEventStatus");
  }

  get updateEventDate()
  {
    return this.updateEventForm.get("updateEventDate");
  }

  get updateEventLocation()
  {
    return this.updateEventForm.get("updateEventLocation");
  }

  get updateEventAddress()
  {
    return this.updateEventForm.get("updateEventAddress");
  }

  get updateEventCity()
  {
    return this.updateEventForm.get("updateEventCity");
  }

  get updateEventState()
  {
    return this.updateEventForm.get("updateEventState");
  }

  get updateEventZip()
  {
    return this.updateEventForm.get("updateEventZip");
  }

  get updateEventCapacity()
  {
    return this.updateEventForm.get("updateEventCapacity");
  }

  get updateEventPhone()
  {
    return this.updateEventForm.get("updateEventPhone");
  }

  get updateEventPresenter()
  {
    return this.updateEventForm.get("updateEventPresenter");
  }

  get updateEventAddress2()
  {
    return this.updateEventForm.get("updateEventAddress2");
  }

  get updateEventDuration()
  {
    return this.updateEventForm.get("updateEventDuration");
  }

  async ngOnInit() {
    await this.getPresenters();
    await this.getStates();
    await this.getSupportGroups();
  }

  async getSupportGroups(){
    (await this.eventService.getEvents(this.supportGroupFilter)).subscribe({
      next: (response: any) => {
        this.eventsList = response.object;
        this.orderSupportGroups();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getPresenters() {
    (await this.eventService.getPresenters()).subscribe({
      next: (response: any) => {
        this.presentersList = response.object;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStates() {
    (await this.insuranceCompanyService.getStates()).subscribe({
      next: (response: any) => {
        this.statesList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addSupportGroup(){
    if(!this.addEventForm.valid){
      this.addEventForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    (await this.eventService.addEvent(this.newEvent)).subscribe({
      next: (response: any) => {
        this.getSupportGroups();
        this.getPresenters();
        this.toastr.success("Support Group successfully created", 'Success');
        this.newEvent = new EventModel("S");
        this.addEventForm.reset();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  async updateSupportGroup(){
    if(!this.updateEventForm.valid){
      this.updateEventForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    (await this.eventService.updateEvent(this.selectedEvent)).subscribe({
      next: (response: any) => {
        this.getSupportGroups();
        this.getPresenters();
        this.toastr.success(this.selectedEvent.id === 0 ? "Support Group cloned successfully" : "Support Group successfully updated", 'Success');
        this.selectedEvent = new EventModel("S");
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  openUpdateSupportGroupConfirmationModal(supportGroupToUpdateModal: any, supportGroup: EventModel, clone: boolean = false) {
    this.selectedEvent = new EventModel("G");
    this.selectedEvent.id = !clone ? supportGroup.id : 0;
    this.selectedEvent.eventTitle = supportGroup.eventTitle;
    this.selectedEvent.eventStatus = supportGroup.eventStatus;
    this.selectedEvent.eventDate = supportGroup.eventDate;
    this.selectedEvent.eventDuration = supportGroup.eventDuration;
    this.selectedEvent.eventPresenter = supportGroup.eventPresenter;
    this.selectedEvent.eventLocation = supportGroup.eventLocation;
    this.selectedEvent.eventAddress1 = supportGroup.eventAddress1;
    this.selectedEvent.eventAddress2 = supportGroup.eventAddress2;
    this.selectedEvent.eventCity = supportGroup.eventCity;
    this.selectedEvent.eventState = supportGroup.eventState;
    this.selectedEvent.eventZip = supportGroup.eventZip;
    this.selectedEvent.eventCapacity = supportGroup.eventCapacity;
    this.selectedEvent.eventPhone = supportGroup.eventPhone;

    this.modalService.open(supportGroupToUpdateModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
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

  async exportExcel(){
    (await this.eventService.getEvents(this.supportGroupFilter)).subscribe({
      next: (response: any) => {
        if (response.object != null && response.object.length > 0) {
          const supportGroups = response.object.map((supportGroup: EventModel) => {
            return {
              "Date": this.datePipe.transform(supportGroup.eventDate, 'M/d/yyyy h:mm a'),
              "Title": supportGroup.eventTitle,
              "Location": supportGroup.eventLocation,
              "City": supportGroup.eventCity,
              "Presenter": supportGroup.eventPresenter,
              "Capacity": supportGroup.eventCapacity,
              "Status": supportGroup.eventStatus === "O" ? "Open" : supportGroup.eventStatus === "C" ? "Closed" : "Cancelled"
            }
          });
          this.excelHelper.exportToExcel(supportGroups, 'Settings Events', ["Date", "Title", "Location", "City", "Presenter", "Capacity", "Status"]);
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async orderBy(event: any, columnName: string) {
    let elements = document.getElementsByClassName('order-column');
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] != event.srcElement && elements[i] != (event.srcElement.nextElementSibling || elements[i] != event.srcElement.previousElementSibling)) {
        elements[i].classList.remove('active-order-by');
      }
    }

    let containsActiveClass = false;
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

    let orderByElement = $('.active-order-by')[0];
    if (orderByElement.classList.contains('fa-arrow-down')) {
      this.orderByDesc = columnName;
      this.orderByAsc = "";
    }
    if (orderByElement.classList.contains('fa-arrow-up')) {
      this.orderByAsc = columnName;
      this.orderByDesc = "";
    }
    this.orderSupportGroups();
  }

  orderSupportGroups() {
    if (this.eventsList && this.eventsList.length > 0){
        if(this.orderByAsc.length > 0){
          switch (this.orderByAsc) {
            case "date":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
              });
              break;
            case "title":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventTitle.toLowerCase() > b.eventTitle.toLowerCase() ? 1 : -1;
              });
              break;
            case "location":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventLocation.toLowerCase() > b.eventLocation.toLowerCase() ? 1 : -1;
              });
              break;
            case "city":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventCity.toLowerCase() > b.eventCity.toLowerCase() ? 1 : -1;
              });
              break;
            case "presenter":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventPresenter === null || a.eventPresenter.length === 0 || a.eventPresenter?.toLowerCase() > b.eventPresenter?.toLowerCase() ? 1 : -1;
              });
              break;
            case "capacity":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventCapacity > b.eventCapacity ? 1 : -1;
              });
              break;
            case "status":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return a.eventStatus.toLowerCase() > b.eventStatus.toLowerCase() ? 1 : -1;
              });
              break;
            default:
              break;
        }
      }else{
          switch (this.orderByDesc) {
            case "date":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
              });
              break;
            case "title":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventTitle.toLowerCase() > a.eventTitle.toLowerCase() ? 1 : -1;
              });
              break;
            case "location":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventLocation.toLowerCase() > a.eventLocation.toLowerCase() ? 1 : -1;
              });
              break;
            case "city":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventCity.toLowerCase() > a.eventCity.toLowerCase() ? 1 : -1;
              });
              break;
            case "presenter":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventPresenter === null || b.eventPresenter.length === 0 || b.eventPresenter?.toLowerCase() > a.eventPresenter?.toLowerCase() ? 1 : -1;
              });
              break;
            case "capacity":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventCapacity > a.eventCapacity ? 1 : -1;
              });
              break;
            case "status":
              this.eventsList = this.eventsList.sort((a: any, b: any) => {
                return b.eventStatus.toLowerCase() > a.eventStatus.toLowerCase() ? 1 : -1;
              });
              break;
            default:
              break;
        }
      }
    }
  }
}
