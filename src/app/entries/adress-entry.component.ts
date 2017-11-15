import { Component, OnInit, Inject } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar } from '@angular/material';

@Component({
  selector: 'selector',
  templateUrl: 'adress-entry.component.html',
  styleUrls: ['./adress-entry.component.css']
})
export class adressEntriesComponent implements OnInit {
  entries: Entry[];
  selectedEntry: Entry;
  searchBar: string;
  pageEvent: PageEvent;
  pageIndex = 0;
  length = 100;
  pageSize = 4;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private adressService: AdressManagementService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(event?: PageEvent): void {
    console.log(event);
    this.adressService.getHeroes(event)
      .subscribe(entries => {
        console.log(event);
        if (event) {
          this.pageIndex = event.pageIndex;
          this.pageSize = event.pageSize;
        }
        this.entries = entries;
        this.length = entries.length;

      });
  }
  selectEntry(entry: Entry) { this.selectedEntry = entry; }

  addEntry(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.adressService.addHero({ name } as Entry)
      .subscribe(entry => {
        this.entries.push(entry);
      });
  }

  deleteEntry(entry: Entry): void {
    this.entries = this.entries.filter(h => h !== entry);
    this.adressService.deleteHero(entry).subscribe();   //callback is subscribe
  }

  openConfirmDialog(entry: Entry): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEntry(entry);
      }
      console.log('The dialog was closed');
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
        console.log(result);
        this.adressService.addHero(result)    // as Entry
          .subscribe(entry => {
            this.entries.push(entry);
          });
      }


      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
