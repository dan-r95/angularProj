import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { Entry } from './entry';
import { HEROES } from './mock.data';
import { MessageService } from './message.service';

@Injectable()
export class AdressManagementService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Entry[]> { //
    // Todo: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
