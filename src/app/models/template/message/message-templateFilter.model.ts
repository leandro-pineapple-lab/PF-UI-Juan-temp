export class MessageTemplateFilterModel {
  keyword: string = '';
  autoResponseEmail: string = '';
  deliveryMethod: string = '';
  allResults: boolean = false;

  hasFilters(){
    return this.keyword.length > 0 || (this.autoResponseEmail && this.autoResponseEmail?.length > 0) || this.deliveryMethod.length > 0;
  }
}
