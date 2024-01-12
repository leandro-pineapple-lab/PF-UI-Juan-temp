import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ProcedureModel } from 'src/app/models/practice/procedure.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  constructor(private http: HttpClient) { }

  getProceduresByCategory(category: string = '', showOnIntake: boolean = false) {
    return this.http.get(`${environment.API_URL}${'api/Procedure/GetProceduresByCategory'}`, {
      params: {
        category,
        showOnIntake
      }
    });
  }

  getValidProcedures(): Observable<ProcedureModel> {
    return this.http.get<ProcedureModel>(`${environment.API_URL}${'api/Procedure/GetValidProcedures'}`);
  }

  async getProcedures(pagination: PagingModel, nameFilter: string, allResults: boolean = false){
    return this.http.get(`${environment.API_URL}${'api/Procedure/GetProcedures'}`, {
      params: {
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        orderByAsc: pagination.orderByAsc,
        orderByDesc: pagination.orderByDesc,
        allResults: allResults,
        nameFilter: nameFilter
      }
    });
  }

  getLeadSources() {
    return this.http.get(`${environment.API_URL}${'api/Procedure/GetLeadSources'}`);
  }

  getLeadTypes() {
    return this.http.get(`${environment.API_URL}${'api/Procedure/GetLeadTypes'}`);
  }

  getServiceLines() {
    return this.http.get(`${environment.API_URL}${'api/Procedure/GetServiceLines'}`);
  }

  addProcedure(newProcedure: ProcedureModel) {
    newProcedure.bariatricSurgery = newProcedure.category == 'G' ? true : false;
    return this.http.post(`${environment.API_URL}${'api/Procedure/Add'}`, newProcedure);
  }

  updateProcedure(selectedProcedure: ProcedureModel) {
    selectedProcedure.bariatricSurgery = selectedProcedure.category == 'B' ? true : false;
    return this.http.post(`${environment.API_URL}${'api/Procedure/Update'}`, selectedProcedure);
  }

  deleteProcedure(selectedProcedure: ProcedureModel) {
    return this.http.delete(`${environment.API_URL}${'api/Procedure/Delete'}`, {params: {
      name: selectedProcedure.name,
      category: selectedProcedure.category
    }});
  }

}
