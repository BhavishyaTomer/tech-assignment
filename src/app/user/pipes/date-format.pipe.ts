import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string | Date, format: string = 'MMMM d, yyyy'): string | null {
    if (!value) return null;

    let date: Date;

    if (typeof value === 'string') {
    
      if (value.match(/^\d{4}-\d{2}-\d{2}$/)) {
        date = new Date(value);
      } else {
        return null; 
      }
    } else {
      date = new Date(value);
    }


    if (isNaN(date.getTime())) {
      return null; 
    }

  
    return formatDate(date, format, 'en-US');
  }
}
