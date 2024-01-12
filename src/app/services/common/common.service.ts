import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { SystemParamsModel } from 'src/app/models/common/system-params/system-param.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  getSystemParams(systemParams: SystemParamsModel[]) {
    return this.http.post(`${environment.API_URL}${'api/Common/GetSystemParams'}`, systemParams);
  }

  logAccess(logAccessDataModel: LogAccessDataModel) {
    return this.http.post(`${environment.API_URL}${'api/Common/LogAccessToPatientData'}`, logAccessDataModel);
  }
}
