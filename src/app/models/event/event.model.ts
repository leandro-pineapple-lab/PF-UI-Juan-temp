import { isDateValid } from "ngx-bootstrap/chronos";

export class EventModel {
    id: number;
    eventType: string;
    eventDate: Date;
    eventDuration: number;
    eventTitle: string;
    eventLocation: string;
    eventAddress1: string;
    eventAddress2: string;
    eventCity: string;
    eventState: string = "";
    eventZip: string;
    eventStatus: string = "O";
    eventCapacity: number;
    eventPhone: string;
    eventPresenter: string;
    eventSubType: string = "S";
    zoomMeetingID: string;
    zoomStartURL: string;
    zoomJoinURL: string;
    zoomUuid: string;
    zoomUuidP1: string;
    zoomUuidP2: string;
    zoomStatus: string;
    mapLocation: string;

    constructor(eventType: string) {
        this.eventType = eventType;
    }
}