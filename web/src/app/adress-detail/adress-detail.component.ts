import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { Entry } from '../entry';
import { AdressManagementService } from '../adress.service';
import { DialogComponent } from '../dialog/dialog.component'
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-adress-detail',
  templateUrl: './adress-detail.component.html',
  styleUrls: ['./adress-detail.component.css']
})
export class AdressDetailComponent implements OnInit {
  entry: Entry;
  // @Input() entry: Entry;

  constructor(private route: ActivatedRoute, private adressService: AdressManagementService,
    private location: Location, public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEntry();
  }

  getEntry(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.adressService.getEntry(id)
      .subscribe(entry => this.entry = entry);
    console.log(this.entry)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.adressService.updateEntry(this.entry)
      .subscribe(() => this.goBack());
  }

  //other component?

  deleteEntry(entry: Entry): void {
    // this.entries = this.entries.filter(h => h !== entry);
    this.adressService.deleteEntry(entry).subscribe(() => this.goBack());
  }

  editEntry(entry: Entry): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: { entry: entry }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("edit - result");
        console.log(result);
        this.adressService.updateEntry(result).subscribe(result => {
          if (result) {
            console.log('edit result');
            this.openSnackBar("Eintrag aktualisiert");
          }
        }
        )

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
    });
  }

  openSnackBar(msg: string) {
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open(msg, null, config);
  }






}
