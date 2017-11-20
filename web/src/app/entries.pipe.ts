import { Pipe, PipeTransform } from '@angular/core';

import { Entry } from './entry';

@Pipe({ name: 'searchFilter' })
export class EntryPipe implements PipeTransform {
  transform(allEntries: Entry[], filter: string) {
    if (!allEntries || !filter) {
      return allEntries;
    }
    filter = filter.toLowerCase();
    return allEntries.filter(entry => entry.name.toLowerCase().indexOf(filter) !== -1);
  }
}
