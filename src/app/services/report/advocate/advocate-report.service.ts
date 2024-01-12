import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { ClearanceVisitsFilterModel } from 'src/app/models/report/advocate/clearance-visits/clearance-visits-filter.model';
import { CompletedHomeworkReportFilterModel } from 'src/app/models/report/advocate/completed-homework/completed-homework-filter.model';
import { CountByStatusFilterModel } from 'src/app/models/report/advocate/count-by-status/count-by-status-filter.model';
import { DailyIntakeReportFilterModel } from 'src/app/models/report/advocate/daily-intake/daily-intake-filter.model';
import { HandoutStatusFilterModel } from 'src/app/models/report/advocate/handout-status/handout-status-filter.model';
import { InitialConsultsFilterModel } from 'src/app/models/report/advocate/initial-consults/initial-consults-filter.model';
import { PatientInsuranceFilterModel } from 'src/app/models/report/advocate/patient-insurance/patient-insurance-filter.model';
import { PlannedSurgeryFilterModel } from 'src/app/models/report/advocate/planned-surgery/planned-surgery-filter.model';
import { PostOpClassFilterModel } from 'src/app/models/report/advocate/post-op-class/post-op-class-filter.model';
import { PreDLetterSentFilterModel } from 'src/app/models/report/advocate/pre-d-letter-sent/pre-d-letter-sent-filter.model';
import { PreOpFilterModel } from 'src/app/models/report/advocate/pre-op/pre-op-filter.model';
import { ProspectByStatusFilterModel } from 'src/app/models/report/advocate/prospect-by-status/prospect-by-status-filter.model';
import { StopProcessFilterModel } from 'src/app/models/report/advocate/stop-process/stop-process-filter.model';
import { WorkflowEfficiencyFilterModel } from 'src/app/models/report/advocate/workflow-efficiency/workflow-efficiency-filter.model';
import { AdvocateReportUtils } from 'src/app/shared/utils/report/advocate/advocate-report.utils';
import { ReportUtils } from 'src/app/shared/utils/report/report.utils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvocateReportService {

  constructor(private http: HttpClient) { }

  getHandoutStatus(pagination: PagingModel, reportFilters: HandoutStatusFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetHandoutStatusReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        assignedFrom: reportFilters.assignedFrom.value ? (reportFilters.assignedFrom.value as Date).toDateString() : '',
        assignedTo: reportFilters.assignedTo.value ? (reportFilters.assignedTo.value as Date).toDateString() : '',
        provider: (reportFilters.provider.value as string),
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

  getWorkflowEfficiency(reportFilters: WorkflowEfficiencyFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetWorkflowEfficiencyReport'}`, {
      params: {
        contactFrom: reportFilters.contactFrom.value ? (reportFilters.contactFrom.value as Date).toDateString() : '',
        contactTo: reportFilters.contactTo.value ? (reportFilters.contactTo.value as Date).toDateString() : '',
        insuranceCo: (reportFilters.insuranceCo.value as string),
        insuranceType: (reportFilters.insuranceType.value as string),
        surgeon: (reportFilters.surgeon.value as string),
        startType: (reportFilters.startType.value as string),
        showDetails: (reportFilters.showDetails.value as boolean) ?? false,
        anonymize: (reportFilters.anonymize.value as boolean) ?? false,
      }
    }).pipe(
      map((data: any) => {
        let {item1} = data.object;
        if (data.object?.item1?.length > 0){
          data.object.item1 = item1.map((x: any) => {
            return {
              ...x,
              patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
              birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
            }
          });
        }
        return data;
      })
    );
  }

  getPlannedSurgeries(reportFilters: PlannedSurgeryFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetPlannedSurgeriesReport'}`, {
      params: {
        surgeryFrom: reportFilters.surgeryFrom.value ? (reportFilters.surgeryFrom.value as Date).toDateString() : '',
        surgeryTo: reportFilters.surgeryTo.value ? (reportFilters.surgeryTo.value as Date).toDateString() : '',
        surgeon: (reportFilters.surgeon.value as string),
        anonymize: (reportFilters.anonymize.value as boolean) ?? false,
      }
    })
  }

  getPreDLetterSent(pagination: PagingModel, reportFilters: PreDLetterSentFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetPreDLetterSentReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        rangeType: (reportFilters.rangeType.value as string),
        from: reportFilters.from.value ? (reportFilters.from.value as Date).toDateString() : '',
        to: reportFilters.to.value ? (reportFilters.to.value as Date).toDateString() : '',
        advocate: (reportFilters.advocate.value as string),
        surgeon: (reportFilters.surgeon.value as string),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
            birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
          }
        });
        return data;
      })
    );
  }

  getPostOpClassReport(pagination: PagingModel, reportFilters: PostOpClassFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetPostOpClassReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        type: (reportFilters.type.value as string),
        classFrom: reportFilters.classFrom.value ? (reportFilters.classFrom.value as Date).toDateString() : '',
        classTo: reportFilters.classTo.value ? (reportFilters.classTo.value as Date).toDateString() : '',
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data.object;
        data.object.results = results.map((x: any) => {
          return {
            ...x,
            firstName: !reportFilters.anonymize.value ? x.firstName : ReportUtils.anonymize(x.firstName),
            lastName: !reportFilters.anonymize.value ? x.lastName : ReportUtils.anonymize(x.lastName),
          }
        });
        return data;
      })
    );
  }

  getCountByStatus(pagination: PagingModel, reportFilters: CountByStatusFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetStatusCountReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        intakeFrom: reportFilters.intakeFrom.value ? (reportFilters.intakeFrom.value as Date).toDateString() : '',
        intakeTo: reportFilters.intakeTo.value ? (reportFilters.intakeTo.value as Date).toDateString() : '',
        statusFrom: reportFilters.statusFrom.value ? (reportFilters.statusFrom.value as Date).toDateString() : '',
        statusTo: reportFilters.statusTo.value ? (reportFilters.statusTo.value as Date).toDateString() : '',
        status: (reportFilters.status.value as number),
      }
    });
  }

  getPatientInsurance(pagination: PagingModel, reportFilters: PatientInsuranceFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetPatientInsuranceReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        statusIdsList: (reportFilters.status.value as number[] | undefined) ?? [],
        insuranceCompany: (reportFilters.insuranceCompany.value as string),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
            birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
          }
        });
        return data;
      })
    );
  }

  getProspectByStatusReport(pagination: PagingModel, reportFilters: ProspectByStatusFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetProspectsByStatusReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        intakeFrom: reportFilters.intakeFrom.value ? (reportFilters.intakeFrom.value as Date).toDateString() : '',
        intakeTo: reportFilters.intakeTo.value ? (reportFilters.intakeTo.value as Date).toDateString() : '',
        status: (reportFilters.status.value as number),
        subStatus: (reportFilters.subStatus.value as number),
        advocate: (reportFilters.advocate.value as string),
        patientType: (reportFilters.patientType.value as string),
        useDateRange: (reportFilters.useDateRange.value as boolean),
        anonymize: (reportFilters.anonymize.value as boolean),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
            birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
          }
        });
        return data;
      })
    );
  }

  getStopProcess(pagination: PagingModel, reportFilters: StopProcessFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetStopProcessReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        from: reportFilters.from.value ? (reportFilters.from.value as Date).toDateString() : '',
        to: reportFilters.to.value ? (reportFilters.to.value as Date).toDateString() : '',
        statusType: (reportFilters.statusType.value as string)
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }

  getInsuranceVerification(pagination: PagingModel, advocateName: string) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetInsuranceVerificationReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        advocateName: advocateName,
      }
    });
  }

  getDuplicatedIntakesReport(pagination: PagingModel, anonymize: boolean) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetDuplicateReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !anonymize ? x.patientName :
                          ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }

  getPreOp(pagination: PagingModel, reportFilters: PreOpFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetPreOpReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        anonymize: (reportFilters.anonymize.value as boolean),
        lastContactFrom: reportFilters.lastContactFrom.value ? (reportFilters.lastContactFrom.value as Date).toDateString() : '',
        lastContactTo: reportFilters.lastContactTo.value ? (reportFilters.lastContactTo.value as Date).toDateString() : '',
        advocate: (reportFilters.advocate.value as string),
        surgeon: (reportFilters.surgeon.value as string),
        insuranceCompany: (reportFilters.insuranceCompany.value as number),
        subStatus: (reportFilters.subStatus.value as number),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }

  getClearanceVisits(pagination: PagingModel, reportFilters: ClearanceVisitsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetClearanceVisitsReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        anonymize: (reportFilters.anonymize.value as boolean),
        visitFrom: reportFilters.visitFrom.value ? (reportFilters.visitFrom.value as Date).toDateString() : '',
        visitTo: reportFilters.visitTo.value ? (reportFilters.visitTo.value as Date).toDateString() : '',
        advocate: (reportFilters.advocate.value as string),
        surgeon: (reportFilters.surgeon.value as string),
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
            birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
          }
        });
        return data;
      })
    );
  }

  getInitialConsultsReport(pagination: PagingModel, reportFilters: InitialConsultsFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetInitialConsultsReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        initialConsultFrom: reportFilters.initialConsultFrom.value ? (reportFilters.initialConsultFrom.value as Date).toDateString() : '',
        initialConsultTo: reportFilters.initialConsultTo.value ? (reportFilters.initialConsultTo.value as Date).toDateString() : '',
        surgeon: (reportFilters.surgeon.value as string),
        advocate: (reportFilters.advocate.value as string)
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
                            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName),
            birthDateString: !reportFilters.anonymize.value ? x.birthDateString : ReportUtils.anonymizeDateString(x.birthDateString)
          }
        });
        return data;
      })
    );
  }

  getDailyIntakeReport(pagination: PagingModel, filters: DailyIntakeReportFilterModel) {
    const filterProperties = AdvocateReportUtils.getDailyIntakeFilterParams();
    const params = AdvocateReportUtils.getReportParams(filterProperties, filters);
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetDailyIntakeReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        intakeFrom: params.intakeFrom ? params.intakeFrom.toDateString() : '',
        intakeTo: params.intakeTo ? params.intakeTo.toDateString() : '',
        lastContactFrom: params.lastContactFrom ? params.lastContactFrom.toDateString() : '',
        lastContactTo: params.lastContactTo ? params.lastContactTo.toDateString() : '',
        leadSource: params.leadSource,
        advocate: params.advocate,
        status: params.status,
        city: params.city,
        state: params.state,
        leadType: params.leadType,
        surgeon: params.surgeon,
        anonymize: params.anonymize,
        plannedProcedure: params.plannedProcedure,
        interestedProcedure: params.interestedProcedure,
        office: params.office,
        referralSource: params.referralSource,
        referralSourceDetail: params.referralSourceDetail,
        ignoreDateRange: params.ignoreDateRange,
        activeLeadsOnly: params.activeLeadsOnly,
        showFirstVisit: params.showFirstVisit,
        serviceLine: params.serviceLine,
        orgId: params.office
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !params.anonymize ? x.patientName :
            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }

  getCompletedHomeworks(pagination: PagingModel, reportFilters: CompletedHomeworkReportFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/AdvocateReport/GetCompletedHomeworkReport'}`, {
      params: {
        allResults: pagination.allResults,
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        orderedSince: reportFilters.orderedSince.value ? (reportFilters.orderedSince.value as Date).toDateString() : '',
        advocate: (reportFilters.advocate.value as string),
        surgeon: (reportFilters.surgeon.value as string),
        anonymize: (reportFilters.anonymize.value as boolean)
      }
    }).pipe(
      map((data: any) => {
        const {results} = data;
        data.results = results.map((x: any) => {
          return {
            ...x,
            patientName: !reportFilters.anonymize.value ? x.patientName :
            ReportUtils.anonymize(x.lastName) + ', ' + ReportUtils.anonymize(x.firstName)
          }
        });
        return data;
      })
    );
  }
}
