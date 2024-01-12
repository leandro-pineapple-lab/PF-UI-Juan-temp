import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private http: HttpClient) { }

  getDataAccessUsers() {
    return this.http.get(`${environment.API_URL}${'api/Log/GetDataAccessUsers'}`);
  }

  getAccessedPages() {
    return this.http.get(`${environment.API_URL}${'api/Log/GetAccessedPages'}`);
  }
}
