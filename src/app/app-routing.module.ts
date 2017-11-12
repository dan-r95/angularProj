import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adressEntriesComponent }      from './entries/adress-entry.component';
import { AdressDetailComponent }      from './adress-detail/adress-detail.component';

const routes: Routes = [
  { path: 'adresses', component: adressEntriesComponent },
  { path: '', redirectTo: '/adresses', pathMatch: 'full' },
  {path:'adressDetail/:id',  component: AdressDetailComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
