import { Component, OnInit } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { MatDialog, PageEvent, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Observable, Subject } from "rxjs";
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'selector',
  templateUrl: 'adress-entry.component.html',
  styleUrls: ['./adress-entry.component.css']
})
export class adressEntriesComponent implements OnInit {
  entries: Entry[];
  entries$: Observable<Entry[]>;
  selectedEntry: Entry;
  searchBar: string;
  pageEvent: PageEvent;
  pageIndex = 0;
  length = 100;
  pageSize = 4;
  // pageSizeOptions = [5, 10, 25, 100];
  autoControl: FormControl = new FormControl();
  private searchTerms = new Subject<string>();

  constructor(private adressService: AdressManagementService, public dialog: MatDialog, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getAllEntries();

    this.entries$ = this.searchTerms.pipe(
      // wait some time after each keystroke
      debounceTime(200),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.adressService.searchEntry(term)),
    );
  }

  getAllEntries(event?: PageEvent): void {
    this.adressService.getEntries(event).subscribe(data => {
      if (event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      }
      this.entries = data;
      this.length = data.length;
    },
      err => {
        this.openSnackBar("Server-Fehler");
      }
    );
  }

  selectEntry(entry: Entry) {
    this.selectedEntry = entry;
  }

  addEntry(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.adressService.addEntry({ name } as Entry)
      .subscribe(entry => {
        console.log(entry);
        this.entries.push(entry);
      }, err => {
        this.openSnackBar("Server-Fehler");
      });
  }

  deleteEntry(entry: Entry): void {
    this.entries = this.entries.filter(h => h !== entry);
    this.adressService.deleteEntry(entry).subscribe();   //callback is subscribe
  }

  editEntry(entry: Entry): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '280px',
      data: { entry: entry }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adressService.updateEntry(result).subscribe(result => this.openSnackBar("Eintrag aktualisiert"))
        console.log('edit result');
      }
    }, err => {
      this.openSnackBar("Server-Fehler");
    });
  }

  openConfirmDialog(entry: Entry): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEntry(entry);
        this.openSnackBar("Eintrag entfernt");

      }
    }, err => {
      this.openSnackBar("Server-Fehler");
    });
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { selectedEntry: this.selectedEntry }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.adressService.addEntry(result)    // as Entry
          .subscribe(entry => {
            this.entries.push(entry);
            this.openSnackBar("Eintrag hinzugefügt");
          });
      }
    });
  }

  search(): void {  //search: string
    this.searchTerms.next(this.searchBar);  //term
  }

  openSnackBar(msg: string) {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   duration: 500,
    // });
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open(msg, null, config);
  }

}
