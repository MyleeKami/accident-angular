import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

moment.locale('fr');

@Pipe({
  name: 'niceDate'
})
export class NiceDatePipe implements PipeTransform {

  transform(value: string): any {
    const date = moment(value);
    console.log(date.locale);
    return date.format('ddd, D MMM YYYY');
  }

}
