import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideDetails'
})
export class HideDetailsPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length === 6) {
      return 'XXXX' + value.slice(-2);
    }
    return value;
  }
}
