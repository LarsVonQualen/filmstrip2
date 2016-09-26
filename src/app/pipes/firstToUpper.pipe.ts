import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'firstToUpper'})
export class FirstToUpperPipe implements PipeTransform {
  transform(value: string, exponent: string): string {
    const val = '' + value;

    if (!val) {
      return '';
    }

    return `${val.substr(0, 1).toUpperCase()}${val.substr(1)}`;
  }
}
