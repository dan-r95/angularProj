import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Entry } from './entry';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';

@Injectable()
export class AdressManagementService {

  private adressesUrl = 'api/entries';  // URL to web api

  constructor(private http: HttpClient) { }

  getEntries(event?: PageEvent): Observable<Entry[]> { //
    console.log(event);
    // Todo: send the message _after_ fetching the heroes
    // this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Entry[]>(this.adressesUrl).pipe(
      catchError(this.handleError('getEntries', []))
    );
  }

  getEntry(id: number): Observable<Entry> {
    const url = `${this.adressesUrl}/${id}`;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Entry>(url).pipe(
      catchError(this.handleError<Entry>(`getEntry id=${id}`))
    );
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

  /** PUT: update the hero on the server */
  updateEntry(entry: Entry): Observable<any> {
    return this.http.put(this.adressesUrl, entry, httpOptions).pipe(
      catchError(this.handleError<any>('updateEntry'))
    );
  }

  /** POST: add a new hero to the server */
  addEntry(entry: Entry): Observable<Entry> {
    return this.http.post<Entry>(this.adressesUrl, entry, httpOptions).pipe(
      catchError(this.handleError<Entry>('addEntry'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEntry(entry: Entry | number): Observable<Entry> {
    const id = typeof entry === 'number' ? entry : entry.id;
    const url = `${this.adressesUrl}/${id}`;

    return this.http.delete<Entry>(url, httpOptions).pipe(
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

}
