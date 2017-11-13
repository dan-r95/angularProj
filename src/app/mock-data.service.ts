import { InMemoryDbService } from 'angular-in-memory-web-api';



export class MockDataService {

private heroesUrl = 'api/entries';  // URL to web api

  constructor() { }



    createDb() {
      const entries = [
        { id: 11, name: 'Mr. Nice', forename:'Dan'},
        { id: 12, name: 'Narco', forename:'Dan' },
        { id: 13, name: 'Bombasto', forename:'Dan' },
        { id: 14, name: 'Celeritas', forename:'Dan' },
        { id: 15, name: 'Magneta', forename:'Dan' },
        { id: 16, name: 'RubberMan', forename:'Dan' },
        { id: 17, name: 'Dynama', forename:'Dan' },
        { id: 18, name: 'Dr IQ', forename:'Dan' },
        { id: 19, name: 'Magma', forename:'Dan' },
        { id: 20, name: 'Tornado', forename:'Dan' }
      ];
      return {entries};
    }

  }
