import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getFavoriteReports(pagination: PagingModel, userId: string = '', reportId = 0) {
    return this.http.get(`${environment.API_URL}${'api/Report/GetFavoriteReports'}`, {
      params: {
        orderBy: pagination.orderBy,
        orderDirection: pagination.orderDirection,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        userId,
        reportId
      }
    });
  }

  getMyFavoriteReports(page: string) {
    return this.http.get(`${environment.API_URL}${'api/Report/GetMyFavoriteReports'}`, {
      params: {
        page
      }
    });
  }

  deleteFavoriteReport(id: number) {
    return this.http.delete(`${environment.API_URL}${'api/Report/DeleteFavoriteReport'}`, {
      params: {
        id
      }
    });
  }

  updateReport(selectedReport: FavoriteReportModel) {
    return this.http.put(`${environment.API_URL}${'api/Report/UpdateFavoriteReport'}`, selectedReport);
  }

  addFavoriteReport(favoriteReport: FavoriteReportModel) {
    return firstValueFrom(this.http.post(`${environment.API_URL}${'api/Report/AddFavoriteReport'}`, favoriteReport));
  }
}
