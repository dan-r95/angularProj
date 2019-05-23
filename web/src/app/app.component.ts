import { Component } from '@angular/core';

import { AdressManagementService } from './adress.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { MatDialog, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Location } from '@angular/common';






@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  angularDocsUrl = 'https://github.com/rossy95/angularProj';



  constructor(private adressService: AdressManagementService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private location: Location, ) {

  }


  deleteAll(): void {
    this.adressService.deleteAll().subscribe();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAll();
        this.openSnackBar('Datenbank zurückgesetzt');
        this.location.back();
      }

    });

  }

  openSnackBar(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open(msg, null, config);
  }

}
