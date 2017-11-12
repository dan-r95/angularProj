import { Component, OnInit, Inject } from '@angular/core';
import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DialogComponent } from '../dialog/dialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'selector',
  templateUrl: 'adress-entry.component.html',
  styleUrls: ['./adress-entry.component.css']
})
export class adressEntriesComponent implements OnInit {
  entries: Entry[];
  selectedEntry: Entry;
  searchBar: string;

  constructor(private adressService: AdressManagementService, public dialog: MatDialog) {  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.adressService.getHeroes()
    .subscribe(entries => this.entries = entries.slice(1,5));
  }
  selectEntry(entry: Entry) { this.selectedEntry = entry; }

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
