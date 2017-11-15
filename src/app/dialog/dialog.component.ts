import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import {FormControl, Validators} from '@angular/forms';

import { Entry } from '../entry';
import { SnackbarComponent } from '../snackbar/snackbar.component'

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  entry: Entry;
  email: string;
  name: string;
  forename: string;
  adress: string;
  work: string;
  mobile: string;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   duration: 500,
    // });
    let config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open("Bitte geforderte Felder angeben", null, config);
  }

  addEntry(): void {
    if (this.email && this.name && this.forename) {
      this.entry.email = this.email;
      this.entry.name = this.name;
      this.entry.forename = this.forename;
      this.dialogRef.close(this.entry);
    }
    else {
      this.openSnackBar();
    }

  }

  // email = new FormControl('', [Validators.required, Validators.email]);
  //
  // getErrorMessage() {
  //   return this.email.hasError('required') ? 'You must enter a value' :
  //   this.email.hasError('email') ? 'Not a valid email' :
  //   '';
  // }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();


  ngOnInit() {
    this.entry = new Entry();
  }

}
