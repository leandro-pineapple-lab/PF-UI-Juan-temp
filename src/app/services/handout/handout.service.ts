import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HandoutCategoryModel } from 'src/app/models/educational-material/handoutCategory.model';
import { HandoutSubCategoryModel } from 'src/app/models/educational-material/handoutSubCategory.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HandoutService {

  constructor(private http: HttpClient) { }

  getHandouts() {
    return this.http.get(`${environment.API_URL}${'api/Handout/GetHandouts'}`);
  }

  async getHandoutCategories() {
    return this.http.get(`${environment.API_URL}${'api/Handout/GetHandoutCategories'}`);
  }

  async addUpdateHandoutCategory(handoutCategory: HandoutCategoryModel) {
    return this.http.post(`${environment.API_URL}${'api/Handout/SaveCategory'}`, handoutCategory);
  }

  async getHandoutSubCategories() {
    return this.http.get(`${environment.API_URL}${'api/Handout/GetHandoutSubCategories'}`);
  }

  async addUpdateHandoutSubCategory(selectedHandoutSubCategory: HandoutSubCategoryModel) {
    return this.http.post(`${environment.API_URL}${'api/Handout/SaveSubCategory'}`, selectedHandoutSubCategory);
  }

}
