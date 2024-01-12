import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'monthToString'
})
export class MonthToStringPipe implements PipeTransform {

  transform(monthNumber: number, displayType: 'short' | 'full' = 'full'): string {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];

    if (!isNaN(monthNumber) && monthNumber >= 1 && monthNumber <= 12) {
      const monthName = months[monthNumber - 1];
      return displayType === 'short' ? monthName.substring(0, 3) : monthName;
    } else {
      if (_.isString(monthNumber)){
        return monthNumber;
      }
      return 'Month is not valid';
    }
  }

}
