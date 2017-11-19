import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Entry } from './entry';
import { MessageService } from './message.service';

//request body options
const bodyOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent } from '@angular/material';

@Injectable()
export class AdressManagementService {

  // private adressesUrl = 'api/entries';  // URL to web api
  private adressesUrl = '/api/adressBook/contacts';
  private addUrl = 'api/adressBook/add';
  private deleteUrl = 'api/adressBook/delete';
  private deleteAllUrl = 'api/adressBook/deleteAll';
  private updateUrl = 'api/adressBook/edit';

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
    console.log(url);
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
    console.log(this.updateUrl);
    console.log(entry);
console.log(bodyOptions);
    return this.http.put(this.updateUrl, entry, bodyOptions).pipe(
      catchError(this.handleError<any>('updateEntry'))
    );
  }

  /** POST: add a new hero to the server */
  addEntry(entry: Entry): Observable<Entry> {

    let body = new URLSearchParams();
    //  for (var i in entry) {
    // if (entry.hasOwnProperty(i)) {
    //    entry[i]=entry[i];
    // }
    // if(entry.name)
    body.set('name', entry.name);
    body.set('forename', entry.forename);
    body.set('email', entry.email);
    if (entry.mobile) {
      body.set('mobile', entry.mobile);
    }
    if (entry.work) {
      body.set('work', entry.work);
    }
    if (entry.zip) {
      body.set('zip', entry.zip.toString());
    }
    if (entry.adress) {
      body.set('adress', entry.adress);
    }
    if (entry.town) {
      body.set('town', entry.town);
    }

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };

    return this.http.post<Entry>(this.addUrl, body.toString(), options).pipe(
      catchError(this.handleError<Entry>('addEntry'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteEntry(entry: Entry | number): Observable<Entry> {
    const id = typeof entry === 'number' ? entry : entry.id;
    console.log("delete " + id);
    const url = `${this.deleteUrl}/${id}`;

    return this.http.delete<Entry>(url, httpOptions).pipe(
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteAll(): Observable<any> {
    console.log("deleteAll");
    return this.http.delete<Entry>(this.deleteAllUrl, httpOptions).pipe(
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

}
