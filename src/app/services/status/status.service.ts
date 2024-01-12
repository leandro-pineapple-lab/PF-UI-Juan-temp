import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusModel } from 'src/app/models/practice/status.model';
import { SubStatusModel } from 'src/app/models/practice/subStatus.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatuses(){
    return this.http.get(`${environment.API_URL}${'api/Status/GetStatuses'}`);
  }

  async getStatusesWithSubStatus(){
    return this.http.get(`${environment.API_URL}${'api/Status/GetStatusWithSubStatus'}`);
  }

  getSubStatuses(){
    return this.http.get(`${environment.API_URL}${'api/Status/GetSubStatuses'}`);
  }

  async deleteStatus(statusId: number){
    return this.http.delete(`${environment.API_URL}${'api/Status/Delete'}`, {params: {statusId: statusId}});
  }

  async deleteSubStatus(subStatusId: number){
    return this.http.delete(`${environment.API_URL}${'api/Status/DeleteSubStatus'}`, {params: {subStatusId: subStatusId}});
  }

  async updateStatus(statusModel: StatusModel){
    return this.http.post(`${environment.API_URL}${'api/Status/Update'}`, statusModel);
  }

  async addStatus(statusModel: StatusModel){
    return this.http.post(`${environment.API_URL}${'api/Status/Add'}`, statusModel);
  }

  async addSubStatus(subStatusModel: SubStatusModel){
    return this.http.post(`${environment.API_URL}${'api/Status/AddSubStatus'}`, subStatusModel);
  }

  async updateSubStatus(subStatusModel: SubStatusModel){
    return this.http.post(`${environment.API_URL}${'api/Status/UpdateSubStatus'}`, subStatusModel);
  }
}
