import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {adressEntriesComponent} from './entries/adress-entry.component';
import {AdressManagementService} from './adress.service';
import {EntryPipe} from './entries.pipe'
import {AdressDetailComponent} from './adress-detail/adress-detail.component';
import {DialogComponent} from './dialog/dialog.component';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {SnackbarComponent} from './snackbar/snackbar.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatPaginatorModule, MatIconModule, MatFormFieldModule, MatCardModule,
  MatToolbarModule, MatSnackBarModule, MatMenuModule, MatAutocompleteModule
} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './/app-routing.module';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent, adressEntriesComponent, EntryPipe, AdressDetailComponent, DialogComponent, ConfirmDialogComponent, SnackbarComponent
  ],
  imports: [
    BrowserModule, MatButtonModule, MatCheckboxModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
    AppRoutingModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatCardModule, MatToolbarModule, MatSnackBarModule, HttpClientModule, MatMenuModule, MatAutocompleteModule
  ],
  providers: [AdressManagementService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, ConfirmDialogComponent, SnackbarComponent]
})
export class AppModule {
}
