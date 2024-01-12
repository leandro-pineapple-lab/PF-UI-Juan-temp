import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PictureModel } from 'src/app/models/template/picture.model';
import { InsuranceCompanyTemplateModel } from 'src/app/models/template/insurance/insuranceCompanyTemplate.model';
import { Subject } from 'rxjs';
import { HomeworkTemplateModel } from 'src/app/models/template/homework/homeworkTemplate.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { MessageTemplateFilterModel } from 'src/app/models/template/message/message-templateFilter.model';
import { MessageTemplateModel } from 'src/app/models/template/message/message-template.model';
import { FileModel } from 'src/app/models/template/file.model';
import { StandardTextModel } from 'src/app/models/template/standard-text/standard-text.model';
import { WorkflowAlertFilterModel } from 'src/app/models/template/workflow-alert/workflow-alert.filter.model';
import { WorkflowAlertModel } from 'src/app/models/template/workflow-alert/workflow-alert.model';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  selectedInsuranceTemplate = new Subject<InsuranceCompanyTemplateModel[]>();

  constructor(private http: HttpClient) { }

  getAppointments() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetAppointments'}`);
  }

  getSurgeries() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetSurgeries'}`);
  }

  async getDefaultTexts(category: string = 'ILL') {
    return this.http.get(`${environment.API_URL}${'api/Template/GetDefaultTexts'}`, {params: {
        category
      }
    });
  }

  async getPictures(title: string) {
    return this.http.get(`${environment.API_URL}${'api/Template/GetPictures'}`, {params: {
        title
      }
    });
  }

  async getHomeworkTemplates() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetHomeworkTemplates'}`);
  }

  async getHomeworkTemplate(patientId: string) {
    return this.http.get(`${environment.API_URL}${'api/Template/GetHomeworkTemplate'}`, {
      params: {
        patientId
      }
    });
  }

  async testMessageTemplate(templateId: number) {
    return this.http.get(`${environment.API_URL}${'api/Template/SendTestMessageTemplate'}`, {
      params: {
        id: templateId
      }
    });
  }

  async deleteHomeworkTemplate(patientId: string) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteHomeworkTemplate'}`, {params: {id: patientId}});
  }

  async disableHomeworkCategory(id: number) {
    return this.http.put(`${environment.API_URL}${'api/Template/DisableHomeworkCategory'}`, {}, {params: {id}});
  }

  async enableHomeworkCategory(id: number) {
    return this.http.put(`${environment.API_URL}${'api/Template/EnableHomeworkCategory'}`, {}, {params: {id}});
  }

  async addHomeworkTemplate(selectedHomeworkTemplate: HomeworkTemplateModel) {
    return this.http.post(`${environment.API_URL}${'api/Template/AddHomeworkTemplate'}`, selectedHomeworkTemplate);
  }

  updateHomeworkTemplate(selectedHomeworkTemplate: HomeworkTemplateModel) {
    return this.http.put(`${environment.API_URL}${'api/Template/UpdateHomeworkTemplate'}`, selectedHomeworkTemplate);
  }

  async deleteInsuranceTemplate(id: number) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteInsuranceTemplate'}`, {params: {id}});
  }

  async getInsuranceTemplates() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetInsuranceCompanyTemplates'}`);
  }

  async downloadFile(seq: number) {
    return this.http.get(`${environment.API_URL}${'api/Template/DownloadFile'}`, {params: {
        id: seq
      },
      responseType: 'blob',
      observe: 'response'
    },
    );
  }

  async addPicture(pictureModel: PictureModel) {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "multipart/form-data");
    headers.set("Accept", "application/json");
    return this.http.post(`${environment.API_URL}${'api/Template/AddPicture'}`, pictureModel.file, {
      headers: headers
    });
  }

  async addMessageAttachment(attachmentModel: FileModel) {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "multipart/form-data");
    headers.set("Accept", "application/json");
    return this.http.post(`${environment.API_URL}${'api/Template/AddMessageTemplateAttachment'}`, attachmentModel.file, {
      headers: headers
    });
  }

  async deleteMessageAttachment(id: number, relativePath: string) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteMessageAttachment'}`, {params: {
      id,
      path: relativePath
    }});
  }

  async addAvatarPicture(avatarPicture: PictureModel) {
    let headers = new HttpHeaders();
    headers.set("Content-Type", "multipart/form-data");
    headers.set("Accept", "application/json");
    return this.http.post(`${environment.API_URL}${'api/Template/AddAvatarPicture'}`, avatarPicture.file, {
      headers: headers
    });
  }

  async deletePicture(seq: number) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeletePicture'}`, {params: {id: seq}});
  }

  async deleteMessageTemplate(messageTemplateId: number) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteMessageTemplate'}`, {params: {id: messageTemplateId}});
  }

  async addInsuranceTemplate(insuranceTemplateModel: InsuranceCompanyTemplateModel) {
    return this.http.post(`${environment.API_URL}${'api/Template/AddInsuranceCompanyTemplate'}`, insuranceTemplateModel);
  }

  async updateInsuranceTemplate(insuranceTemplateModel: InsuranceCompanyTemplateModel) {
    return this.http.put(`${environment.API_URL}${'api/Template/UpdateInsuranceCompanyTemplate'}`, insuranceTemplateModel);
  }

  async getHomeworkCategories() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetHomeworkCategories'}`);
  }

  async getHomeworkCategoriesWithDetails() {
    return this.http.get(`${environment.API_URL}${'api/Template/GetHomeworkCategoriesWithDetails'}`);
  }

  async addMessageTemplate(messageModel: MessageTemplateModel) {
    return this.http.post(`${environment.API_URL}${'api/Template/AddMessageTemplate'}`, messageModel);
  }

  async updateMessageTemplate(messageModel: MessageTemplateModel) {
    return this.http.put(`${environment.API_URL}${'api/Template/UpdateMessageTemplate'}`, messageModel);
  }

  async getMessageTemplates(pagination: PagingModel, messageTemplateFilter: MessageTemplateFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/Template/GetMessageTemplates'}`, {
      params:{
        orderByAsc: pagination.orderByAsc,
        orderByDesc: pagination.orderByDesc,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        keyword: messageTemplateFilter.keyword,
        autoResponseEmail: messageTemplateFilter.autoResponseEmail,
        deliveryMethod: messageTemplateFilter.deliveryMethod,
        allResults: messageTemplateFilter.allResults
      }
    });
  }

  getStandardTexts(pagination: PagingModel, professionalId: number) {
    return this.http.get(`${environment.API_URL}${'api/Template/GetStandardTexts'}`, {
      params:{
        orderBy: pagination.orderBy,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        professionalResourceId: professionalId
      }
    });
  }

  addStandardText(standardTextModel: StandardTextModel) {
    return this.http.post(`${environment.API_URL}${'api/Template/AddStandardText'}`, standardTextModel);
  }

  updateStandardText(standardTextModel: StandardTextModel) {
    return this.http.put(`${environment.API_URL}${'api/Template/UpdateStandardText'}`, standardTextModel);
  }

  deleteStandardText(id: number) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteStandardText'}`, {params: {id}});
  }

  getWorkflowAlerts(workflowAlertFilter: WorkflowAlertFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/Template/GetWorkflowAlerts'}`, {
      params:{
        keyword: workflowAlertFilter.keyword,
        method: workflowAlertFilter.method,
      }
    });
  }

  deleteWorkflowAlert(id: number) {
    return this.http.delete(`${environment.API_URL}${'api/Template/DeleteWorkflowAlert'}`, {params: {id}});
  }

  addWorkflowRule(workflowAlertModel: WorkflowAlertModel) {
    return this.http.post(`${environment.API_URL}${'api/Template/AddWorkflowAlert'}`, workflowAlertModel);
  }

  updateWorkflowRule(workflowAlertModel: WorkflowAlertModel) {
    return this.http.put(`${environment.API_URL}${'api/Template/UpdateWorkflowAlert'}`, workflowAlertModel);
  }

}
