import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HospitalModel } from 'src/app/models/practice/hospital.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  addHospital(newHospital: HospitalModel) {
    return this.http.post(`${environment.API_URL}${'api/Hospital/Add'}`, newHospital);
  }

  getHospitals(){
    return this.http.get(`${environment.API_URL}${'api/Hospital/GetHospitals'}`);
  }

  getValidHospitals() {
    return this.http.get(`${environment.API_URL}${'api/Hospital/GetValidHospitals'}`);
  }

  async getStates(){
    return this.http.get(`${environment.API_URL}${'api/Hospital/GetStates'}`);
  }

  async updateHospital(hospital: HospitalModel){
    return this.http.post(`${environment.API_URL}${'api/Hospital/Update'}`, hospital);
  }
}
