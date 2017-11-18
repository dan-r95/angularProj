import { Component, OnInit, Inject } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DataProviderService } from '../data-provider.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar, MatSnackBarConfig } from '@angular/material';

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

  constructor(private adressService: AdressManagementService, private dataService: DataProviderService, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllEntries();
  }

  getAllEntries(event?: PageEvent): void {
    this.adressService.getEntries(event).subscribe(data => {
      // Read the result field from the JSON response.
      // this.results = data['results'];
      if (event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
      }
      this.entries = data;
      this.length = data.length;
      console.log(data),
        // Errors will call this callback instead:
        err => {
          console.log('Something went wrong!');
        }
    });
    // console.log(event);
    // this.adressService.getEntries(event)
    //   .subscribe(entries => {
    //     console.log(event);
    //     if (event) {
    //       this.pageIndex = event.pageIndex;
    //       this.pageSize = event.pageSize;
    //     }
    //     this.entries = entries;
    //     this.length = entries.length;
    //
    //   });
  }
  selectEntry(entry: Entry) { this.selectedEntry = entry; }

  addEntry(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.adressService.addEntry({ name } as Entry)
      .subscribe(entry => {
          console.log(entry);
        // if(error){
        //   this.openSnackBar("Serverseitiger Fehler :/");
        // } else{
        this.entries.push(entry);
      // }
      });
  }

  deleteEntry(entry: Entry): void {
    this.entries = this.entries.filter(h => h !== entry);
    this.adressService.deleteEntry(entry).subscribe();   //callback is subscribe
  }

  editEntry(entry: Entry): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { entry: entry }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adressService.updateEntry(result).subscribe(result => this.openSnackBar("Eintrag aktualisiert"))
        console.log('edit result');
      }
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
        this.adressService.addEntry(result)    // as Entry
          .subscribe(entry => {
            this.entries.push(entry);
            this.openSnackBar("Eintrag hinzugefügt");
          });
      }


      console.log('The dialog was closed');
      console.log(result);
    });
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
