import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReferralService {

  constructor(private http: HttpClient) { }

  async getReferralSources() {
    return this.http.get(`${environment.API_URL}${'api/Referral/GetReferralSources'}`);
  }
}
