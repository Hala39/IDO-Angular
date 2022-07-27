import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  transform(value: string, count: number): unknown {
    return count > 1 || count === 0 ? `${value}s` : value;
  }

}