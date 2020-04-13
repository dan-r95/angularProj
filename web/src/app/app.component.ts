import { Component, ViewChild, OnInit } from '@angular/core';

import { AdressManagementService } from './adress.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { SidenavService } from './navigation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;

  opened: boolean;

  angularDocsUrl = 'https://github.com/dan-r95/angularProj';

  @ViewChild('sidenav', { static: true }) public sidenav: MatSidenav;

  constructor(private adressService: AdressManagementService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private location: Location, private sidenavService: SidenavService) {

  }

  public ngOnInit(): void {
    // Store sidenav to service
    this.sidenavService
      .setSidenav(this.sidenav);
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


  openGit() {
    window.open(this.angularDocsUrl, '_blank');
  }

  openSnackBar(msg: string) {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open(msg, null, config);
  }

}
