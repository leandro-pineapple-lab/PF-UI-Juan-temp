import { Params } from '@angular/router';
import * as moment from 'moment';
import { FavoriteReportParamModel } from "src/app/models/report/favorite-report/favorite-report-params.model";
import { ParamQueryType, TableHeader } from "src/types/types";
import { FormatHelper } from '../../helpers/format-helper';

export class FavoriteReportUtils {

  static tableHeaders: TableHeader[] = [
    {
      name: 'Report',
      orderColumnName: 'Title',
      fieldValue: 'title',
    },
    {
      name: 'Action',
      applyCanSaveSettingsDirective: true,
      customActions: [
        {
          icon: 'fa fa-play',
          tooltip: 'Run Report',
          class: 'text-info',
          actionName: 'run'
        },
        {
          icon: 'fa fa-calendar',
          tooltip: 'Add to Schedule',
          class: 'text-success',
          actionName: 'addToSchedule'
        },
      ]
    },
  ];

  static changeValueToOptions: { name: string; value: string }[] = [
    { name: 'Current Year', value: 'Current Year' },
    { name: 'Previous Year', value: 'Previous Year' },
    { name: '1st day Current Month', value: '1st day Current Month' },
    { name: 'Last day Current Month', value: 'Last day Current Month' },
    { name: '1st day Previous Month', value: '1st day Previous Month' },
    { name: 'Last day Previous Month', value: 'Last day Previous Month' },
    { name: '1st day Current Year', value: '1st day Current Year' },
    { name: 'Last day Current Year', value: 'Last day Current Year' },
    { name: '1st day Previous Year', value: '1st day Previous Year' },
    { name: 'Last day Previous Year', value: 'Last day Previous Year' },
    { name: '1st day 1st Quarter', value: '1st day 1st Quarter' },
    { name: 'Last day 1st Quarter', value: 'Last day 1st Quarter' },
    { name: '1st day 2nd Quarter', value: '1st day 2nd Quarter' },
    { name: 'Last day 2nd Quarter', value: 'Last day 2nd Quarter' },
    { name: '1st day 3rd Quarter', value: '1st day 3rd Quarter' },
    { name: 'Last day 3rd Quarter', value: 'Last day 3rd Quarter' },
    { name: '1st day 4th Quarter', value: '1st day 4th Quarter' },
    { name: 'Last day 4th Quarter', value: 'Last day 4th Quarter' },
    { name: '3 months ago', value: '3 months ago' },
    { name: '6 months ago', value: '6 months ago' },
    { name: '12 months ago', value: '12 months ago' },
    { name: '18 months ago', value: '18 months ago' },
    { name: '1st day 12 months ago', value: '1st day 12 months ago' },
    { name: '1st day Current Week', value: '1st day Current Week' },
    { name: 'Last day Current Week', value: 'Last day Current Week' },
    { name: '1st day Previous Week', value: '1st day Previous Week' },
    { name: 'Last day Previous Week', value: 'Last day Previous Week' },
    { name: 'Today', value: 'Today' },
    { name: 'Yesterday', value: 'Yesterday' },
  ];

  static convertToFavoriteReportParams = <T>(reportFilters: T): FavoriteReportParamModel[]  =>{
    const favoriteReportParams: FavoriteReportParamModel[] = [];
    for (let prop in reportFilters) {
      if ((reportFilters as Object).hasOwnProperty(prop)) {
        const innerObj: any = reportFilters[prop as keyof T];
        const value = this.parseFavoriteReportValue(innerObj.value);
        const customValue = this.parseFavoriteReportValue(innerObj.customValue);
        const favoriteReportParam: FavoriteReportParamModel = {
          id: 0,
          reportId: 0,
          description: innerObj.description,
          key: innerObj.key,
          value,
          displayValue: customValue
        };

        favoriteReportParams.push(favoriteReportParam);
      }
    }

    return favoriteReportParams;
  }

  static parseFavoriteReportValue(value: any){
    const parsedValue = value instanceof Date ? moment(value).format('MM/DD/YYYY') :
                          value instanceof Array ? value.join('|') : (value ?? '').toString();
    return parsedValue;
  }

  static setFavoriteReportFiltersFromParams(params: Params, reportFilters: any){
    for (const param in params) {
      if (reportFilters.filterQueryParamMapping.hasOwnProperty(param)) {
        const { key, type } = reportFilters.filterQueryParamMapping[param];
        const filterValue = params[param];
        const filter = reportFilters[key];
        const paramType = (type as ParamQueryType);
        if (filterValue && filterValue.length > 0) {
          switch (paramType) {
            case "Date":
              const date = FormatHelper.convertStringToDate(filterValue);
              filter.value = date ? date : filterValue;
              break;
            case "boolean":
              filter.value = filterValue === 'true';
              break;
            case "Array":
              filter.value = filterValue.split('|');
              break;
            default:
              filter.value = filterValue;
              break;
          }
        }
      }
    }
  }
}
