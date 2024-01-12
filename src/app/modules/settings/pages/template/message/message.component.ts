import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { ToastrService } from 'ngx-toastr';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { StatusModel } from 'src/app/models/practice/status.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { MessageTemplateFilterModel } from 'src/app/models/template/message/message-templateFilter.model';
import { StatusService } from 'src/app/services/status/status.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { ExcelHelper } from 'src/app/shared/helpers/excel.helper';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileModel } from 'src/app/models/template/file.model';
import { environment } from 'src/environments/environment';
import keywords from './utils/keywords';
import deliveryMethods from './utils/delivery-methods';
import { MessageVisibilityModel } from 'src/app/models/template/message/message-visibility.model';
import { MessageFieldModel } from 'src/app/models/template/message/message-field.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewInit {

  active: number = 1;
  deliveryMethods = deliveryMethods;
  messageTemplatesList: MessageTemplateModel[] = [];
  messageModel: MessageTemplateModel = new MessageTemplateModel();
  messageDeleteModel: MessageTemplateModel = new MessageTemplateModel();
  attachmentModel: FileModel = new FileModel();
  apiUrl: string = environment.API_URL;
  keywordsList = keywords;
  messageFilters: MessageTemplateFilterModel = new MessageTemplateFilterModel();
  statusList: StatusModel[] = [];
  pagination: PagingModel = new PagingModel();
  maxSize: number = 10;
  showingFrom = 1;
  showingTo = this.pagination.tableSize;
  excelHelper: any = null;
  messageShowComponentsModel: MessageVisibilityModel = new MessageVisibilityModel();
  messageFieldModel: MessageFieldModel = new MessageFieldModel();
  @ViewChild('optionsRow')
  optionsRow: ElementRef;

  messageForm = new UntypedFormGroup({
    messageTitle: new UntypedFormControl("", [Validators.required]),
    messageSubject: new UntypedFormControl("", [Validators.required]),
    messageText: new UntypedFormControl("", [Validators.required]),
    messageDeliveryMethod: new UntypedFormControl("", Validators.required),
    messageAutoResponse: new UntypedFormControl(false),
    messageChangeStatus: new UntypedFormControl("")
  });

  get messageTitle()
  {
    return this.messageForm.get("messageTitle");
  }

  get messageDeliveryMethod()
  {
    return this.messageForm.get("messageDeliveryMethod");
  }

  get messageSubject()
  {
    return this.messageForm.get("messageSubject");
  }

  get messageAutoResponse()
  {
    return this.messageForm.get("messageAutoResponse");
  }

  get messageText()
  {
    return this.messageForm.get("messageText");
  }

  get messageChangeStatus()
  {
    return this.messageForm.get("messageChangeStatus");
  }

  constructor(private templateService: TemplateService, private toastr: ToastrService, private datePipe: DatePipe,
    private fileSaver: FileSaverService, private statusService: StatusService, private modalService: NgbModal) {
    this.excelHelper = new ExcelHelper(this.fileSaver);
  }

  async ngOnInit(): Promise<void> {
    this.pagination.orderByAsc = 'template';
    this.getMessageTemplates();
    this.getStatusList();
    this.subscribeToMessageDeliveryMethodChanges();
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', (event: any) => {
      if (event.target && event.target.classList.contains('remove-row')) {
        this.removeOptionsRow(event);
      }
    });
  }

  async getMessageTemplates(){
    (await this.templateService.getMessageTemplates(this.pagination, this.messageFilters)).subscribe({
      next: (response: any) => {
        this.messageTemplatesList = response.results;
        this.messageShowComponentsModel.loading = false;
        this.pagination.totalNumberOfRecords = response.totalNumberOfRecords;
        this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ? this.pagination.totalNumberOfRecords :
                          (this.pagination.page * this.pagination.tableSize);
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStatusList(){
    (await this.statusService.getStatusesWithSubStatus()).subscribe({
      next: (response: any) => {
        this.statusList = response;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async search(){
    if (this.messageFilters.hasFilters()){
      this.pagination = new PagingModel();
    }

    this.getMessageTemplates();
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
    await this.getMessageTemplates();
  }

  async onTableDataChange(event: any) {
    this.showingTo = (event * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (event * this.pagination.tableSize);
    this.showingFrom = event == 1 ? 1 : ((event - 1) * (this.pagination.tableSize)) + 1;
    this.pagination.page = event;
    await this.getMessageTemplates();
  }

  async onTableSizeChange(event: any) {
    this.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ?
                this.pagination.totalNumberOfRecords : (this.pagination.page * this.pagination.tableSize);
    this.showingFrom = this.pagination.page == 1 ? 1 : ((this.pagination.page - 1) * (this.pagination.tableSize)) + 1;
    await this.getMessageTemplates();
  }

  async exportExcel(){
    this.messageFilters.allResults = true;
    (await this.templateService.getMessageTemplates(this.pagination, this.messageFilters)).subscribe({
      next: (response: any) => {
        if (response.results != null && response.results.length > 0) {
          const messageTemplates = response.results.map((messageTemplate: any) => {
            return {
              "Template": messageTemplate.title,
              "Delivery Method": messageTemplate.deliveryMethod,
              "Used in Automated Process": messageTemplate.autoResponseEmail ? "Yes" : "No",
              "Date Saved": this.datePipe.transform(messageTemplate.loadedOn, 'M/dd/yyyy HH:mm:ss a'),
              "Saved By": messageTemplate.loadedBy
            }
          });
          this.messageFilters.allResults = false;
          this.excelHelper.exportToExcel(messageTemplates, 'Settings Message Templates', ["Template", "Delivery Method", "Used in Automated Process", "Date Saved", "Saved By"]);
        }
      },
      error: (e: any) => {
        this.toastr.show(e.error, 'Error');
        this.messageFilters.allResults = false;
      }
    });
  }

  async addMessageTemplate(){
    if (!this.messageForm.valid){
      this.messageForm.markAllAsTouched();
      this.toastr.error("Please enter the required fields", 'Error');
      return;
    }
    this.messageModel.deliveryMethod = this.messageForm.value.messageDeliveryMethod;
    this.messageModel.autoResponseEmail = this.messageForm.value.messageAutoResponse;
    this.messageModel.changeStatusTo = this.messageForm.value.messageChangeStatus;
    (await this.templateService.addMessageTemplate(this.messageModel)).subscribe({
      next: (response: any) => {
        this.toastr.success('Message template successfully created.', 'Success');
        this.messageModel = new MessageTemplateModel();
        this.getMessageTemplates();
        this.resetForm();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error.message, 'Error');
        }
      }
    });
  }

  newMessageTemplate(){
    this.messageModel = new MessageTemplateModel();
    this.resetForm();
  }

  resetForm(){
    this.messageForm.reset();
    this.messageForm = new UntypedFormGroup({
      messageTitle: new UntypedFormControl("", [Validators.required]),
      messageSubject: new UntypedFormControl("", [Validators.required]),
      messageText: new UntypedFormControl("", [Validators.required]),
      messageDeliveryMethod: new UntypedFormControl("", Validators.required),
      messageAutoResponse: new UntypedFormControl(false),
      messageChangeStatus: new UntypedFormControl("")
    });
    this.subscribeToMessageDeliveryMethodChanges();
  }

  subscribeToMessageDeliveryMethodChanges(): void {
    const messageDeliveryMethodControl = this.messageForm.get('messageDeliveryMethod');
    if (messageDeliveryMethodControl) {
      messageDeliveryMethodControl.valueChanges.subscribe((value) => {
        if (value === 'S') {
          this.messageShowComponentsModel.showTextArea = true;
        } else {
          this.messageShowComponentsModel.showTextArea = false;
        }
      });
    }
  }

  async updateMessageTemplate(){
    if (!this.messageForm.valid){
      this.messageForm.markAllAsTouched();
      this.toastr.error("Please enter the required fields", 'Error');
      return;
    }
    this.messageModel.deliveryMethod = this.messageForm.value.messageDeliveryMethod;
    this.messageModel.autoResponseEmail = this.messageForm.value.messageAutoResponse;
    this.messageModel.changeStatusTo = this.messageForm.value.messageChangeStatus;
    (await this.templateService.updateMessageTemplate(this.messageModel)).subscribe({
      next: (response: any) => {
        this.toastr.success('Message template successfully updated.', 'Success');
        this.getMessageTemplates();
      },
      error: (e: any) => {
        if (e.error.errors){
          this.toastr.error('Please fill the required fields', 'Error');
        }else{
          this.toastr.error(e.error.message, 'Error');
        }
      }
    });
  }

  openMessageTemplateDeleteModal(messageTemplateDeleteModal: any, messageTemplate: MessageTemplateModel) {
    this.messageDeleteModel = messageTemplate;
    this.modalService.open(messageTemplateDeleteModal, { ariaLabelledBy: 'modal-basic-title'});
  }

  async deleteMessageTemplate(messageTemplateId: number){
    (await this.templateService.deleteMessageTemplate(messageTemplateId)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }

        this.getMessageTemplates();
        this.toastr.success("The selected message template has been successfully deleted", 'Success');
        this.messageDeleteModel = new MessageTemplateModel();
        this.modalService.dismissAll();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  showUploadButton(event: Event) {
    const input = event.target as HTMLInputElement;
    const uploadBtn = document.getElementById('btnUpload') as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      uploadBtn.style.display = 'block';
    }else{
      uploadBtn.style.display = 'none';
    }
  }

  async removeFile(id: number, relativePath: string, index: number){
    (await this.templateService.deleteMessageAttachment(id, relativePath)).subscribe({
      next: (response: any) => {
        if (!response.hasErrors){
          this.messageModel.attachedFiles.splice(index, 1);
          this.getMessageTemplates();
          this.toastr.success("Attachment successfully deleted", 'Success');
        }else{
          this.toastr.error(response.errorMessage, 'Error');
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async uploadFile() {
    let selectedFile: any = (<HTMLInputElement>document.getElementById('fUploadFile'))?.files?.item(0);

    if (selectedFile === null){
      this.toastr.error("Please select a File.", 'Error');
      return;
    }

    this.attachmentModel.file = new FormData();
    this.attachmentModel.file.append("file", selectedFile, selectedFile.name);
    this.attachmentModel.file.append("messageTemplateId", this.messageModel.id.toString());

    (await this.templateService.addMessageAttachment(this.attachmentModel)).subscribe({
      next: (response: any) => {
        this.getMessageTemplates();
        this.attachmentModel = new FileModel();
        let fileElement: any = document.getElementById('fUploadFile');
        if (fileElement !== null){
          fileElement.value = '';
        }
        this.messageModel.attachedFiles.push(response.object);
        this.toastr.success("Attachment successfully created", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async testMessageTemplate(templateId: number){
    (await this.templateService.testMessageTemplate(templateId)).subscribe({
      next: (response: any) => {
        if (!response.hasErrors){
          this.toastr.success("The email has been successfully sent", 'Success');
        }else{
          this.toastr.error(response.errorMessage, 'Error');
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  setMessageTemplateModel(messageTemplate: MessageTemplateModel){
    this.messageModel = messageTemplate;
    this.messageForm?.get('messageDeliveryMethod')?.setValue(this.deliveryMethods[messageTemplate.deliveryMethod]);
    this.messageForm?.get('messageAutoResponse')?.setValue(messageTemplate.autoResponseEmail);
    let addUpdateCardBody: any = $('#formCardBody');
    if(addUpdateCardBody.hasClass("collapse")){
      this.messageShowComponentsModel.formCollapsed = false;
      addUpdateCardBody.collapse("show");
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addKeyword(code: string){
    this.messageModel.templateText += code;
  }

  addField(fieldType: string){
    if (fieldType === 'Date' && this.messageFieldModel.dateField?.length > 0){
      this.messageModel.templateText += '{{' + fieldType + ':' + this.messageFieldModel.dateField + '}}';
    }
    if (fieldType === 'Time' && this.messageFieldModel.timeField?.length > 0){
      this.messageModel.templateText += '{{' + fieldType + ':' + this.messageFieldModel.timeField + '}}';
    }
    if (fieldType === 'Text' && this.messageFieldModel.textField?.length > 0){
      this.messageModel.templateText += '{{' + fieldType + ':' + this.messageFieldModel.textField + '}}';
    }
  }

  addOptionsList(){
    if (this.messageFieldModel.listField?.length === 0){
      this.toastr.error('Please enter the name of the field; that will help you when sending the message', 'Error');
      return;
    }
    const inputs: any = document.getElementsByClassName('options-input');
    console.log("🚀 ~ file: message.component.ts:436 ~ MessageComponent ~ addOptionsList ~ inputs:", inputs)
    let options: string = "";
    let optionsAmount: number = 0;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value) {
        options += inputs[i].value + "|";
        optionsAmount++;
      }
    }
    if (optionsAmount < 2){
      this.toastr.error('Please enter at least 2 options!', 'Error');
      return;
    }
    this.messageModel.templateText += '{{Options:' + this.messageFieldModel.listField + "||" + options.slice(0, -1) + '}}';
  }

  addOptionsRow(){
    const inputsAmount = document.getElementsByClassName('options-input').length;
    if (inputsAmount >= 18){
      return;
    }
    const originalElement = this.optionsRow.nativeElement;
    const newOptions = this.getNewOptionsTemplate(inputsAmount);
    originalElement.parentNode.insertAdjacentHTML('beforeend', newOptions);
  }

  getNewOptionsTemplate(inputsAmount: number){
    return `<div class="row margin-top-separation-sm">
              <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <input placeholder="option ${inputsAmount + 1}" class="form-control input-sm options-input">
              </div>
              <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <input placeholder="option ${inputsAmount + 2}" type="text" class="form-control input-sm options-input">
              </div>
              <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
                <input placeholder="option ${inputsAmount + 3}" type="text" class="form-control input-sm options-input">
              </div>
              <div class="col-xs-12 col-sm-12 col-md-3 col-md-offset-1 col-lg-offset-1 col-lg-3">
                <button class="btn btn-danger remove-row">
                  <i class="fa fa-minus remove-row" aria-hidden="true"></i>
                </button>
              </div>
            </div>`;
  }

  removeOptionsRow(event: any){
    const row = (event.target as HTMLElement).closest('.row');
    if (row){
      row.remove();
    }
  }
}
