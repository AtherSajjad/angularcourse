import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortlist',
})
export class SortlistPipe implements PipeTransform {
  transform(value: [], propName: string): any {
    if (value.length == 0) {
      return value;
    }

    let sortedArray = value.sort((a, b) => {
      return (<string>a[propName]).localeCompare(
        (<string>b[propName]).toLowerCase()
      );
    });

    return sortedArray;
  }
}
