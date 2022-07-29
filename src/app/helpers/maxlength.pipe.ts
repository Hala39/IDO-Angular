import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxLength'
})
export class MaxLengthPipe implements PipeTransform {

  transform(value: string, max: number): unknown {
    return value.length <= max? value : value.substring(0, max);
  }

}