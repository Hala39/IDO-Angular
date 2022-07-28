import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'maxlength'})
export class MaxLengthPipe implements PipeTransform {
  transform(value: string, max: number = 500, type: string): string {
    if (type === 'string')
      return value.length <= max? value : value.substring(0, max);
    else return value;
  }

}
