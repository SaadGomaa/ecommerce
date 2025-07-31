import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(arrayOfObject: any[], textSearch: string): any[] {
    return arrayOfObject.filter((item) => item.title.toLowerCase().includes(textSearch.toLowerCase()));
  }
}
