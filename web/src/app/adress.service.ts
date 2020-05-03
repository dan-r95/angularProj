import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Entry } from './entry';

// request body options
const bodyOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
};

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { PageEvent } from '@angular/material/paginator';

@Injectable()
export class AdressManagementService {

  private adressesUrl = '/api/adressBook/contacts';
  private addUrl = 'api/adressBook/add';
  private deleteUrl = 'api/adressBook/delete';
  private deleteAllUrl = 'api/adressBook/deleteAll';
  private updateUrl = 'api/adressBook/edit';
  private searchUrl = 'api/adressBook/contactSearch';

  constructor(private http: HttpClient) {
  }

  /**
   * request to return all contacts
   * @param {PageEvent} event
   * @returns {Observable<Entry[]>}
   */
  getEntries(event?: PageEvent): Observable<Entry[]> { //
    console.log('getEntries');
    return this.http.get<Entry[]>(this.adressesUrl).pipe(
      catchError(this.handleError('getEntries', []))
    );
  }

  /**
   * request to return a contact specified by the id given as a  url parameter
   * @param {number} id
   * @returns {Observable<Entry>}
   */
  getEntry(id: number): Observable<Entry> {
    const url = `${this.adressesUrl}/${id}`;
    console.log('getEntry' + id);
    return this.http.get<Entry>(url).pipe(
      catchError(this.handleError<Entry>(`getEntry id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /**
   * request to update new properties of a contact and returns the same object
   * @param {Entry} entry
   * @returns {Observable<any>}
   */
  updateEntry(entry: Entry): Observable<any> {
    console.log(this.updateUrl);
    console.log(entry);
    console.log(bodyOptions);

    const body = new URLSearchParams();
    body.set('id', entry.id.toString());
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
    console.log('update' + entry);
    return this.http.put(this.updateUrl, body.toString(), bodyOptions).pipe(
      catchError(this.handleError<any>('updateEntry'))
    );
  }

  /**
   * request to add a new contact (DB and cache)
   * @param {Entry} entry
   * @returns {Observable<Entry>}
   */
  addEntry(entry: Entry): Observable<Entry> {

    const body = new URLSearchParams();
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

    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    console.log('add' + entry);
    return this.http.post<Entry>(this.addUrl, body.toString(), options).pipe(
      catchError(this.handleError<Entry>('addEntry'))
    );
  }

  /**
   * request to delete the specific contact by url parameter (id)
   * @param {Entry | number} entry
   * @returns {Observable<Entry>}
   */
  deleteEntry(entry: Entry | number): Observable<Entry> {
    const id = typeof entry === 'number' ? entry : entry.id;
    console.log('delete ' + id);
    const url = `${this.deleteUrl}/${id}`;

    return this.http.delete<Entry>(url, httpOptions).pipe(
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

  /**
   * request to completely wipe any contact in cache and db
   * @returns {Observable<any>}
   */
  deleteAll(): Observable<any> {
    console.log('deleteAll');
    return this.http.delete<Entry>(this.deleteAllUrl, httpOptions).pipe(
      catchError(this.handleError<Entry>('deleteEntry'))
    );
  }

  /* GET heroes whose name contains search term */
  searchEntry(searchString: string): Observable<Entry[]> {
    if (!searchString.trim()) {
      return of([]);
    }
    console.log('search ' + searchString);
    return this.http.get<Entry[]>(this.searchUrl + `?ss=${searchString}`).pipe(
      catchError(this.handleError<Entry[]>('searchHeroes', []))
    );
  }

}
