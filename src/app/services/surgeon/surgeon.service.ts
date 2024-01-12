import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurgeonRotationModel } from 'src/app/models/practice/surgeonRotation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurgeonService {

  constructor(private http: HttpClient) { }

  async getSurgeonRotations(){
    return this.http.get(`${environment.API_URL}${'api/Surgeon/GetSurgeonRotations'}`);
  }

  async getSurgeons(){
    return this.http.get(`${environment.API_URL}${'api/Surgeon/GetSurgeons'}`);
  }

  async updateRotation(selectedSurgeonRotation: SurgeonRotationModel) {
    return this.http.post(`${environment.API_URL}${'api/Surgeon/Update'}`, selectedSurgeonRotation);
  }
  
}
