import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileSaverService } from 'ngx-filesaver';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EventFilterModel } from 'src/app/models/event/event-filter.model';
import { EventModel } from 'src/app/models/event/event.model';
import { EventService } from 'src/app/services/event/event.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';

@Component({
  selector: 'app-virtual-group',
  templateUrl: './virtual-group.component.html',
  styleUrls: ['./virtual-group.component.scss']
})
export class VirtualGroupComponent implements OnInit {

  virtualGroupFilter: EventFilterModel = new EventFilterModel("V");
  newEvent: EventModel = new EventModel("V");
  selectedEvent: EventModel = new EventModel("V");
  eventsList: EventModel[] = [];
  presentersList: any[] = [];
  statesList: any[] = [];
  meridian = true;
  showEventAddBody: boolean = false;
  closeResult: string = "";
  excelHelper: any = null;
  orderByAsc: string = "date";
  orderByDesc: string = ""

  constructor(private eventService: EventService, private toastr: ToastrService, private modalService: NgbModal, private spinnerService: NgxSpinnerService,
    private fileSaver: FileSaverService, private datePipe: DatePipe) {
      this.excelHelper = new ExcelHelper(this.fileSaver);
    }

  addEventForm = new UntypedFormGroup({
    addEventTitle: new UntypedFormControl("", [Validators.required]),
    addEventStatus: new UntypedFormControl("", [Validators.required]),
    addEventDate: new UntypedFormControl("", [Validators.required]),
    addEventCapacity: new UntypedFormControl("", [Validators.required]),
    addEventPresenter: new UntypedFormControl("", [Validators.required]),
    addEventDuration: new UntypedFormControl(""),
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

  get addEventDuration()
  {
    return this.addEventForm.get("addEventDuration");
  }

  get addEventPresenter()
  {
    return this.addEventForm.get("addEventPresenter");
  }

  get addEventCapacity()
  {
    return this.addEventForm.get("addEventCapacity");
  }

  updateEventForm = new UntypedFormGroup({
    updateEventTitle: new UntypedFormControl("", [Validators.required]),
    updateEventStatus: new UntypedFormControl("", [Validators.required]),
    updateEventDate: new UntypedFormControl("", [Validators.required]),
    updateEventCapacity: new UntypedFormControl("", [Validators.required]),
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

  get updateEventCapacity()
  {
    return this.updateEventForm.get("updateEventCapacity");
  }

  get updateEventPresenter()
  {
    return this.updateEventForm.get("updateEventPresenter");
  }

  get updateEventDuration()
  {
    return this.updateEventForm.get("updateEventDuration");
  }

  async ngOnInit() {
    await this.getPresenters();
    await this.getVirtualGroups();
  }

  async getVirtualGroups(){
    (await this.eventService.getEvents(this.virtualGroupFilter)).subscribe({
      next: (response: any) => {
        this.eventsList = response.object;
        this.orderVirtualGroups();
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

  async addVirtualGroup(){
    if(!this.addEventForm.valid){
      this.addEventForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    (await this.eventService.addVirtualGroup(this.newEvent)).subscribe({
      next: (response: any) => {
        this.getVirtualGroups();
        this.getPresenters();
        this.toastr.success("Virtual Group successfully created", 'Success');
        this.newEvent = new EventModel("V");
        this.addEventForm.reset();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  async updateVirtualGroup(){
    if(!this.updateEventForm.valid){
      this.updateEventForm.markAllAsTouched();
      this.toastr.error("Please fill the required fields", 'Error');
      return;
    }
    (await this.eventService.updateVirtualGroup(this.selectedEvent)).subscribe({
      next: (response: any) => {
        this.getPresenters();
        this.toastr.success(this.selectedEvent.id === 0 ? "Virtual Group cloned successfully" : "Virtual Group successfully updated", 'Success');
        this.selectedEvent = new EventModel("V");
        this.modalService.dismissAll();
        this.getVirtualGroups();
      },
      error: (e: any) => {
        if (e.error != null && e.error.errors != null){
          this.toastr.error("Please fill the required fields", 'Error');
        }
      }
    });
  }

  openUpdateVirtualGroupConfirmationModal(virtualGroupToUpdateModal: any, virtualGroup: EventModel, clone: boolean = false) {
    this.selectedEvent = new EventModel("V");
    this.selectedEvent.id = !clone ? virtualGroup.id : 0;
    this.selectedEvent.eventTitle = virtualGroup.eventTitle;
    this.selectedEvent.eventStatus = virtualGroup.eventStatus;
    this.selectedEvent.eventDate = virtualGroup.eventDate;
    this.selectedEvent.eventDuration = virtualGroup.eventDuration;
    this.selectedEvent.eventPresenter = virtualGroup.eventPresenter;
    this.selectedEvent.eventCapacity = virtualGroup.eventCapacity;

    this.modalService.open(virtualGroupToUpdateModal, {ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
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
    (await this.eventService.getEvents(this.virtualGroupFilter)).subscribe({
      next: (response: any) => {
        if (response.object != null && response.object.length > 0) {
          const virtualGroups = response.object.map((virtualGroup: EventModel) => {
            return {
              "Date": this.datePipe.transform(virtualGroup.eventDate, 'M/d/yyyy h:mm a'),
              "Title": virtualGroup.eventTitle,
              "Presenter": virtualGroup.eventPresenter,
              "Capacity": virtualGroup.eventCapacity,
              "Status": virtualGroup.eventStatus === "O" ? "Open" : virtualGroup.eventStatus === "C" ? "Closed" : "Cancelled"
            }
          });
          this.excelHelper.exportToExcel(virtualGroups, 'Settings Events', ["Date", "Title", "Presenter", "Capacity", "Status"]);
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
    this.orderVirtualGroups();
  }

  orderVirtualGroups() {
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
