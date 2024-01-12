import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { EmployerPatientsFilterModel } from 'src/app/models/report/marketing/employer-patients-filter.model';
import { EmployerStatsFilterModel } from 'src/app/models/report/marketing/employer-stats-filter.model';
import { SurgicalHxFilterModel } from 'src/app/models/report/marketing/surgical-hx-filter.model';
import { ReportUtils } from 'src/app/shared/utils/report/report.utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingReportService {

  constructor(private http: HttpClient) { }

  getEmployerPatients(pagination: PagingModel, reportFilters: EmployerPatientsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MarketingReport/GetEmployerPatientsReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        employer: (reportFilters.employer.value as string) ?? '',
        zip: reportFilters.zip.value ? (reportFilters.zip.value as string[]) : [],
        reportLevel: (reportFilters.reportLevel.value as string),
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    }).pipe(
      tap((response: any) => {
        if (reportFilters.reportLevel.value === 'S' && response?.object?.results?.length > 0) {
          response.object.results[response.object.results.length - 1].cssClass = 'bold';
        }
      }),
      map((data: any) => {
        const {results} = data?.object;
        if (results){
          data.object.results = results.map((x: any) => {
            return {
              ...x,
              patientName: !reportFilters.anonymize.value ? x.patientName :
              ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
            }
          });
        }
        return data;
      })
    );
  }

  getSurgicalHx(pagination: PagingModel, reportFilters: SurgicalHxFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MarketingReport/GetSurgicalHxReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        surgeon: (reportFilters.surgeon.value as string),
        procedure: (reportFilters.procedure.value as string),
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            lossPercentage: x.lossPercentage ? x.lossPercentage += '%' : '',
            patientName: !reportFilters.anonymize.value ? x.patientName :
            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }

  getEmployerStats(pagination: PagingModel, reportFilters: EmployerStatsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MarketingReport/GetEmployerStatsReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        employers: reportFilters.employer.value ? (reportFilters.employer.value as string[]) : [],
      }
    });
  }
}
