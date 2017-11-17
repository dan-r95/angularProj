import { Pipe, PipeTransform } from '@angular/core';

import { Entry } from './entry';

@Pipe({ name: 'searchFilter' })
export class EntryPipe implements PipeTransform {
  transform(allHeroes: Entry[], filter: string) {
    if (!allHeroes || !filter) {
      return allHeroes;
    }
    filter = filter.toLowerCase();
    return allHeroes.filter(entry => entry.name.toLowerCase().indexOf(filter) !== -1);
  }
}
