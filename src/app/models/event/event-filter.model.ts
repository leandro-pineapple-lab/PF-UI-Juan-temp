export class EventFilterModel {
    private currentDate: Date = new Date();
    from: Date = new Date();
    to: Date = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 6));
    city: string = "";
    status: string = "";
    presenter: string = "";
    type: string;

    constructor(type: string) {
        this.type = type;
    }
}