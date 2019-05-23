import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import {Entry} from '../entry';


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

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar) {
  }
  entry: Entry;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  // setValue() { this.emailFormControl.setValue('new value'); }

  matcher = new MyErrorStateMatcher();

  onNoClick(): void {
    this.dialogRef.close();
  }

  openSnackBar() {
    const config = new MatSnackBarConfig();
    config.duration = 1000;
    this.snackBar.open('Bitte geforderte Felder angeben', null, config);
  }

  addEntry(): void {
    if (this.entry.email && this.entry.name && this.entry.forename) {
      this.dialogRef.close(this.entry);
    } else {
      this.openSnackBar();
    }

  }


  ngOnInit() {

    if (this.data && this.data.entry) {
      this.entry = this.data.entry;
    } else {
      this.entry = new Entry();
    }

  }
}
