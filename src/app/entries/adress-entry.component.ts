import { Component, OnInit, Inject } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DialogComponent } from '../dialog/dialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent} from '@angular/material';

@Component({
  selector: 'selector',
  templateUrl: 'adress-entry.component.html',
  styleUrls: ['./adress-entry.component.css']
})
export class adressEntriesComponent implements OnInit {
  entries: Entry[];
  selectedEntry: Entry;
  searchBar: string;
  // MatPaginator Output
  pageEvent: PageEvent;
  // length = 100;
  // pageSize = 10;
  // pageSizeOptions = [5, 10, 25, 100];

  constructor(private adressService: AdressManagementService, public dialog: MatDialog) {  }

  ngOnInit() {
    this.getHeroes();
    // setPageSizeOptions(setPageSizeOptionsInput: string) {
    //    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    //  }
  }

  getHeroes(): void {
    this.adressService.getHeroes()
    .subscribe(entries => this.entries = entries);  //.slice(1,5)
  }
  selectEntry(entry: Entry) { this.selectedEntry = entry; }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.adressService.addHero({ name } as Entry)
    .subscribe(entry => {
      this.entries.push(entry);
    });
  }

  delete(entry: Entry): void {
    this.entries = this.entries.filter(h => h !== entry);
    this.adressService.deleteHero(entry).subscribe();   //callback is subscribe
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { selectedEntry: this.selectedEntry }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

}
