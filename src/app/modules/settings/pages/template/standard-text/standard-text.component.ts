import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ProfessionalUserModel } from 'src/app/models/professional/professional-user.model';
import { StandardTextModel } from 'src/app/models/template/standard-text/standard-text.model';
import { CommonService } from 'src/app/services/common/common.service';
import { TemplateService } from 'src/app/services/template/template.service';
import { UserService } from 'src/app/services/user/user.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-standard-text',
  templateUrl: './standard-text.component.html',
  styleUrls: ['./standard-text.component.scss']
})
export class StandardTextComponent implements OnInit {
  professionalUserProviders: ProfessionalUserModel[] = [];
  professionalUserFilter: ProfessionalUserModel = new ProfessionalUserModel();
  standardTextModel: StandardTextModel = new StandardTextModel();
  updateDeleteStandardTextModel: StandardTextModel = new StandardTextModel();
  standardTextsList: StandardTextModel[] = [];
  logAccessDataModel: LogAccessDataModel = new LogAccessDataModel();
  pagination: PagingModel = new PagingModel();
  maxSize: number = 10;
  showingFrom = 1;
  showingTo = this.pagination.tableSize;
  loading: boolean = true;
  action: string = '';


  constructor(private userService: UserService, private commonService: CommonService, private toastr: ToastrService,
              private templateService: TemplateService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.pagination.orderBy = 'owner_desc';
    this.logAccessData();
    this.getProfessionalProviders();
    this.getStandardTexts();
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.STANDARD_TEXTS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

  async getProfessionalProviders(){
    (await this.userService.getProfessionalProviders()).subscribe({
      next: (response: any) => {
        if (response && response?.object?.length > 0){
          this.professionalUserProviders = response.object;
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getStandardTexts(){
    const resourceId: number = this.professionalUserFilter.id ? parseInt(this.professionalUserFilter.id) : 0;
    (await this.templateService.getStandardTexts(this.pagination, resourceId)).subscribe({
      next: (response: any) => {
        if (response && response?.object?.results?.length > 0){
          this.standardTextsList = response.object.results;
          this.pagination.totalNumberOfRecords = response.object.totalNumberOfRecords;
          this.pagination.showingTo = (this.pagination.page * this.pagination.tableSize) > this.pagination.totalNumberOfRecords ? this.pagination.totalNumberOfRecords :
                                      (this.pagination.page * this.pagination.tableSize);
        }else{
          this.standardTextsList = [];
        }
        this.loading = false;
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
        this.loading = false;
      }
    });
  }

  async addStandardText(){
    (await this.templateService.addStandardText(this.standardTextModel)).subscribe({
      next: (response: any) => {
        this.getStandardTexts();
        this.standardTextModel = new StandardTextModel();
        this.toastr.success("Text has been added!", 'Success');
      },
      error: (e: any) => {
        if (e.error?.errors){
          this.toastr.error(e.error.errors.Text, 'Error');
        }
      }
    });
  }

  async onTableDataChange(event: any) {
    this.pagination.tableDataChange(event);
    await this.getStandardTexts();
  }

  async onTableSizeChange() {
    this.pagination.tableSizeChange();
    await this.getStandardTexts();
  }

  async searchStandardTexts(){
    await this.getStandardTexts();
  }

  getProfessionalProviderName(professionalUserId: string){
    const provider = this.professionalUserProviders.find(x => x.id === professionalUserId);
    return provider ? provider.fullName : "All Providers";
  }

  openStandardTextUpdateDeleteModal(messageTemplateDeleteModal: any, selectedstandardText: StandardTextModel, action: string) {
    this.updateDeleteStandardTextModel = selectedstandardText;
    this.modalService.open(messageTemplateDeleteModal, { ariaLabelledBy: 'modal-basic-title' });
    this.action = action;
  }

  async updateStandardText() {
    (await this.templateService.updateStandardText(this.updateDeleteStandardTextModel)).subscribe({
      next: (response: any) => {
        this.getStandardTexts();
        this.updateDeleteStandardTextModel = new StandardTextModel();
        this.modalService.dismissAll();
        this.toastr.success("Text has been updated!", 'Success');
      },
      error: (e: any) => {
        if (e.error?.errors){
          this.toastr.error(e.error.errors.Text, 'Error');
        }
      }
    });
  }

  async deleteStandardText() {
    (await this.templateService.deleteStandardText(this.updateDeleteStandardTextModel.id)).subscribe({
      next: (response: any) => {
        this.getStandardTexts();
        this.updateDeleteStandardTextModel = new StandardTextModel();
        this.modalService.dismissAll();
        this.toastr.success("Text has been deleted!", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async orderBy(columnName: string) {
    if (columnName === this.pagination.orderBy){
      this.pagination.orderBy += "_desc";
    }else{
      this.pagination.orderBy = columnName;
    }
    await this.getStandardTexts();
  }
}
