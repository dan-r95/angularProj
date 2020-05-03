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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavService } from './navigation.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


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
    MatStepperModule, MatProgressSpinnerModule, MatSidenavModule, MatListModule,
    MatToolbarModule, MatSnackBarModule, HttpClientModule, MatMenuModule, MatAutocompleteModule, DragDropModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AdressManagementService, SidenavService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, ConfirmDialogComponent, SnackbarComponent]
})
export class AppModule {
}
