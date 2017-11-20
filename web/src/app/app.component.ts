import {Component} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

import {AdressManagementService} from './adress.service';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component'

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  angularDocsUrl = "https://github.com/rossy95/angularProj"

  constructor(private adressService: AdressManagementService, public dialog: MatDialog, public snackBar: MatSnackBar,
              private route: ActivatedRoute, private location: Location) {
  }

  deleteAll(): void {
    this.adressService.deleteAll().subscribe();
  }

  openConfirmDialog(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteAll();
        this.openSnackBar("Datenbank zurückgesetzt");
        this.location.back();
      }

    });

  }

  openSnackBar(msg: string) {
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open(msg, null, config);
  }

}
