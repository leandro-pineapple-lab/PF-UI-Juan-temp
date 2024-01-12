import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PagingModel } from 'src/app/models/common/paging/paging.model';
import { TagModel } from 'src/app/models/practice/tag.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  async getTags(pagination: PagingModel) {
    return this.http.get(`${environment.API_URL}${'api/Tag/GetTags'}`, {
      params: {
        orderByAsc: pagination.orderByAsc,
        orderByDesc: pagination.orderByDesc,
        pageNumber: pagination.page,
        pageSize: pagination.tableSize,
        allResults: pagination.allResults
      }
    });
  }

  addTag(newTag: TagModel) {
    return this.http.post(`${environment.API_URL}${'api/Tag/Add'}`, newTag);
  }

  deleteTag(name: string) {
    return this.http.delete(`${environment.API_URL}${'api/Tag/Delete'}`, {params: {tagName: name}});
  }
}
