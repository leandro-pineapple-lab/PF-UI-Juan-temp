export class AdvocateModel {
    userId: string;
    name: string = '';
    fullName: string = '';
    phone: string = '';
    ext: string = '';
    email: string = '';
    showOnHomeworkSheet: boolean = false;

    isValid(): boolean {
        return this.name.length > 0 && this.userId.length > 0;
    }
}