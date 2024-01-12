import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BudgetModel } from 'src/app/models/referral/budget.model';
import { MarketingCategoryModel } from 'src/app/models/referral/marketingCategory.model';
import { MarketingSubCategoryModel } from 'src/app/models/referral/marketingSubCategory.model';
import { MDReferralModel } from 'src/app/models/referral/md-referral.model';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {

  constructor(private http: HttpClient) { }

  async getBudgets(selectedYear: number){
    return this.http.get(`${environment.API_URL}${'api/Marketing/GetBudgetsByYear'}`, { params: {
      year: selectedYear
    }});
  }

  async getCategories(){
    return this.http.get(`${environment.API_URL}${'api/Marketing/GetCategories'}`);
  }

  async getSubCategories() {
    return this.http.get(`${environment.API_URL}${'api/Marketing/GetSubCategories'}`);
  }

  async saveBudget(budget: BudgetModel) {
    return this.http.post(`${environment.API_URL}${'api/Marketing/SaveBudget'}`, budget);
  }

  async deleteBudget(budgetId: number) {
    return this.http.delete(`${environment.API_URL}${'api/Marketing/DeleteBudget'}`, {params: {id: budgetId}});
  }

  async saveCategory(category: MarketingCategoryModel) {
    return this.http.post(`${environment.API_URL}${'api/Marketing/SaveCategory'}`, category);
  }

  async deleteCategory(categoryId: number) {
    return this.http.delete(`${environment.API_URL}${'api/Marketing/DeleteCategory'}`, {params: {id: categoryId}});
  }

  async deleteSubCategory(subCategoryId: number) {
    return this.http.delete(`${environment.API_URL}${'api/Marketing/DeleteSubCategory'}`, {params: {id: subCategoryId}});
  }

  async saveSubCategory(selectedSubCategory: MarketingSubCategoryModel) {
    return this.http.post(`${environment.API_URL}${'api/Marketing/SaveSubCategory'}`, selectedSubCategory);
  }

  async addMDReferral(mdReferral: MDReferralModel) {
    return this.http.post(`${environment.API_URL}${'api/Marketing/SaveMDReferral'}`, mdReferral);
  }

  async deleteMDReferral(mdReferralId: number) {
    return this.http.delete(`${environment.API_URL}${'api/Marketing/DeleteMDReferral'}`, {params: {id: mdReferralId}});
  }

  updateMDReferral(selectedMDReferral: MDReferralModel) {
    return this.http.put(`${environment.API_URL}${'api/Marketing/SaveMDReferral'}`, selectedMDReferral);
  }

  getMDReferrals(pagination: PagingModel, firstNameFilter: string, lastNameFilter: string) {
    return this.http.get(`${environment.API_URL}${'api/Marketing/GetMDReferrals'}`, {
      params:{
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        allResults: pagination.allResults,
        firstName: firstNameFilter,
        lastName: lastNameFilter
      }
    });
  }

}
