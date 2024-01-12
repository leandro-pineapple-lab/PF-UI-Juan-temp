import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LocalPagingModel } from 'src/app/models/common/paging/local-paging.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ComplicationStatsFilterModel } from 'src/app/models/report/medical/complication-stats-filter.model';
import { ComplicationsFilterModel } from 'src/app/models/report/medical/complications-filter.model';
import { LongHospitalStaysFilterModel } from 'src/app/models/report/medical/long-hospital-stays-filter.model';
import { ReadmissionsFilterModel } from 'src/app/models/report/medical/readmissions-filter.model';
import { ReportUtils } from 'src/app/shared/utils/report/report.utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicalReportService {

  constructor(private http: HttpClient) {
  }

  getComplications(reportFilters: ComplicationsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MedicalReport/GetComplicationsReport'}`, {
      params: {
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        complicationFrom: reportFilters.complicationFrom.value ? (reportFilters.complicationFrom.value as Date).toDateString() : '',
        complicationTo: reportFilters.complicationTo.value ? (reportFilters.complicationTo.value as Date).toDateString() : '',
        procedure: (reportFilters.procedure.value as string) ?? '',
        complicationType: (reportFilters.complicationType.value as string),
        complicationStatus: (reportFilters.complicationStatus.value as string),
        surgeon: (reportFilters.surgeon.value as string) ?? '',
        hospital: (reportFilters.hospital.value as string) ?? '',
        referral: (reportFilters.referral.value as string) ?? '',
        employer: (reportFilters.employer.value as string) ?? '',
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    });
  }

  getReadmissions(reportFilters: ReadmissionsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MedicalReport/GetReadmissionsReport'}`, {
      params: {
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        readmissionFrom: reportFilters.readmissionFrom.value ? (reportFilters.readmissionFrom.value as Date).toDateString() : '',
        readmissionTo: reportFilters.readmissionTo.value ? (reportFilters.readmissionFrom.value as Date).toDateString() : '',
        procedure: (reportFilters.procedure.value as string) ?? '',
        surgeon: (reportFilters.surgeon.value as string) ?? '',
        hospital: (reportFilters.hospital.value as string) ?? '',
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    });
  }

  getComplicationStats(pagination: LocalPagingModel, reportFilters: ComplicationStatsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MedicalReport/GetComplicationStatsReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        surgeryType: (reportFilters.surgeryType.value as string),
        surgeon: (reportFilters.surgeon.value as string),
        procedure: (reportFilters.procedure.value as string),
      }
    });
  }

  getLongHospitalStays(pagination: PagingModel, reportFilters: LongHospitalStaysFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MedicalReport/GetLongHospitalStaysReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        hospital: (reportFilters.hospital.value as string),
        surgeon: (reportFilters.surgeon.value as string),
        procedure: (reportFilters.procedure.value as string),
        stayDuration: (reportFilters.stayDuration.value as number),
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data.object;
        data.object.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
          }
        });
        return data;
      })
    );
  }
}
