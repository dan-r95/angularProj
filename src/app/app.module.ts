import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Inject } from '@angular/core';

import { AppComponent } from './app.component';
import { adressEntriesComponent } from './entries/adress-entry.component';
import { AdressManagementService } from './adress.service';
import { MessageService } from './message.service';
import { EntryPipe} from './entries.pipe'
import { AdressDetailComponent } from './adress-detail/adress-detail.component';
import { DialogComponent }  from './dialog/dialog.component';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,
  MatPaginatorModule, MatIconModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatCardModule, MatToolbarModule} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { MockDataService }  from './mock-data.service';




  @NgModule({
    declarations: [
      AppComponent, adressEntriesComponent, EntryPipe, AdressDetailComponent, DialogComponent
    ],
    imports: [
      BrowserModule, MatButtonModule, MatCheckboxModule, MatInputModule, FormsModule,
      BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule,
      AppRoutingModule, MatIconModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
      MatCardModule, MatToolbarModule, HttpClientModule,
      HttpClientInMemoryWebApiModule.forRoot(MockDataService, { dataEncapsulation: false }
)
    ],  //MatDialog MatDialogRef
    providers: [AdressManagementService, MessageService],
    bootstrap: [AppComponent],
    entryComponents: [DialogComponent]
  })
  export class AppModule { }
