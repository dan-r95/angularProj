import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { adressEntriesComponent } from './entries/adress-entry.component';
import { AdressManagementService } from './adress.service';
import { MessageService } from './message.service';
import {EntryPipe} from './entries.pipe'


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './/app-routing.module';



@NgModule({
  declarations: [
    AppComponent, adressEntriesComponent, EntryPipe
  ],
  imports: [
    BrowserModule, MatButtonModule, MatCheckboxModule, MatInputModule, FormsModule,
    BrowserAnimationsModule, MatDatepickerModule, MatNativeDateModule, MatPaginatorModule, AppRoutingModule
  ],
  providers: [AdressManagementService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
