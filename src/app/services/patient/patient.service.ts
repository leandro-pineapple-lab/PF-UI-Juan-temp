import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { PatientModel } from 'src/app/models/patient/patient.model';
import { PatientFilterModel } from 'src/app/models/patient/patientFilter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getEmployers() {
    return this.http.get(`${environment.API_URL}${'api/Patient/GetEmployerNames'}`);
  }

  getPatientFilters(){
    return this.http.get(`${environment.API_URL}${'api/Patient/GetPatientFilters'}`);
  }

  addPatient(newPatient: PatientModel) {
    return this.http.post(`${environment.API_URL}${'api/Patient/Add'}`, newPatient);
  }

  getPatients(pagination: PagingModel, filters: PatientFilterModel){
    const selectedStatuses = filters.statuses.filter(x => x.selected).map(status => {
      return {
        name: status.name
      }
    });

    if (selectedStatuses.length > 0) {
      selectedStatuses.forEach(status => {
        filters.selectedStatuses += `${status.name},`;
      });
    }

    return this.http.get(`${environment.API_URL}${'api/Patient/GetPatients'}`, {
      params:{
        orderByAsc: pagination.orderByAsc,
        orderByDesc: pagination.orderByDesc,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        firstName: filters.firstName,
        lastName: filters.lastName,
        dateOfBirth: filters.dateOfBirth != null ? filters.dateOfBirth.toDateString() : '',
        advocate: filters.advocate,
        whatsNextUntil: filters.whatsNextUntil != null ? filters.whatsNextUntil.toDateString() : '',
        email: filters.email,
        phone: filters.phone,
        active: filters.active,
        surgeon: filters.surgeon,
        officeId: filters.officeId,
        leadFrom: filters.leadFrom != null ? filters.leadFrom.toDateString() : '',
        leadTo: filters.leadTo != null ? filters.leadTo.toDateString() : '',
        serviceLine: filters.serviceLine,
        leadType: filters.leadType,
        leadSource: filters.leadSource,
        insuranceCompany: filters.insuranceCompany,
        groupNumber: filters.groupNumber,
        lastEncounterFrom: filters.lastEncounterFrom != null ? filters.lastEncounterFrom.toDateString() : '',
        lastEncounterTo: filters.lastEncounterTo != null ? filters.lastEncounterTo.toDateString() : '',
        status: filters.status,
        selectedStatuses: filters.selectedStatuses,
        allResults: filters.allResults
      }
    });
  }

  getPatientsByFirstAndLastName(pagination: PagingModel, firstNameFilter: string, lastNameFilter: string) {
    return this.http.get(`${environment.API_URL}${'api/Patient/GetPatientsByFirstAndLastName'}`, {
      params:{
        orderByAsc: pagination.orderByAsc,
        orderByDesc: pagination.orderByDesc,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        firstName: firstNameFilter,
        lastName: lastNameFilter
      }
    });
  }
}
