import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from 'src/app/models/event/event.model';
import { EventFilterModel } from 'src/app/models/event/event-filter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  async getPresenters(){
    return this.http.get(`${environment.API_URL}${'api/Event/GetPresenters'}`);
  }

  async addEvent(eventModel: EventModel){
    return this.http.post(`${environment.API_URL}${'api/Event/AddEvent'}`, eventModel);
  }

  async addVirtualGroup(newEvent: EventModel) {
    return this.http.post(`${environment.API_URL}${'api/Event/AddVirtualGroup'}`, newEvent);
  }

  async updateEvent(eventModel: EventModel) {
    return this.http.put(`${environment.API_URL}${'api/Event/UpdateEvent'}`, eventModel);
  }

  async updateVirtualGroup(selectedEvent: EventModel) {
    return this.http.put(`${environment.API_URL}${'api/Event/UpdateVirtualGroup'}`, selectedEvent);
  }

  async getEvents(seminarFilter: EventFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/Event/GetEvents'}`, {
        params: {
          type: seminarFilter.type,
          from: seminarFilter.from != null ? seminarFilter.from.toDateString() : '',
          to: seminarFilter.to != null ? seminarFilter.to.toDateString() : '',
          city: seminarFilter.city,
          status: seminarFilter.status,
          presenter: seminarFilter.presenter
        }
    });
  }
}
