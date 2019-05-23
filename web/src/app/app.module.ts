import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdressEntriesComponent } from './entries/adress-entry.component';
import { AdressManagementService } from './adress.service';
import { EntryPipe } from './entries.pipe';
import { AdressDetailComponent } from './adress-detail/adress-detail.component';
import { DialogComponent } from './dialog/dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SnackbarComponent } from './snackbar/snackbar.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatPaginatorModule, MatIconModule, MatFormFieldModule, MatCardModule,
  MatToolbarModule, MatSnackBarModule, MatMenuModule, MatAutocompleteModule, MatStepperModule,
  MatProgressSpinnerModule, MatSidenavModule, MatListModule
} from '@angular/material';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent, AdressEntriesComponent, EntryPipe, AdressDetailComponent, DialogComponent, ConfirmDialogComponent, SnackbarComponent,
    LoginComponent, RegistrationComponent, NavbarComponent
  ],
  imports: [
    BrowserModule, MatButtonModule, MatCheckboxModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
    AppRoutingModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatCardModule, MatToolbarModule, MatSnackBarModule, HttpClientModule, MatMenuModule, MatAutocompleteModule,
    MatStepperModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule
  ],
  providers: [AdressManagementService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, ConfirmDialogComponent, SnackbarComponent]
})
export class AppModule {
}
