import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Entry } from './entry';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class DataProviderService {

  // private api = 'http://localhost:8080/'
  // this.api +
  private getTestEntry =  '/api/adressBook/myresource/testJson';  // URL to web api

  constructor(private http: HttpClient) { }

  getAllData(): Observable<Entry> {
    return this.http.get<Entry>(this.getTestEntry).pipe(catchError(this.handleError<Entry>('getAllData')));

  }


  addEntry(): void {
    const body = { name: 'Brad' };

    this.http.post('/api/developers/add', body)
      // See below - subscribe() is still necessary when using post().
      .subscribe(data => {
        // Read the result field from the JSON response.
        // this.results = data['results'];
        console.log(data),
          // Errors will call this callback instead:
          err => {
            console.log('Something went wrong!');
          }
      });
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
