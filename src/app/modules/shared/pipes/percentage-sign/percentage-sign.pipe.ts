import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentageSign'
})
export class PercentageSignPipe implements PipeTransform {

  transform(value: number): string {
    return value + '%';
  }

}
