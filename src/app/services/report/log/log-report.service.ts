import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { PatientDataAccessFilterModel } from 'src/app/models/report/advocate/data-access/patient-data-access-filter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogReportService {

  constructor(private http: HttpClient) { }

  getDataAccess(pagination: PagingModel, reportFilters: PatientDataAccessFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/LogReport/GetDataAccessUsersReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        accessFrom: reportFilters.accessFrom.value ? (reportFilters.accessFrom.value as Date).toDateString() : '',
        accessTo: reportFilters.accessTo.value ? (reportFilters.accessTo.value as Date).toDateString() : '',
        accessBy: (reportFilters.user.value as string),
        pageAccessed: (reportFilters.pageAccessed.value as string),
      }
    });
  }
}
