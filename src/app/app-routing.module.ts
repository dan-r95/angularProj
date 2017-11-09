import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { adressEntriesComponent }      from './entries/adress-entry.component';

const routes: Routes = [
  { path: 'heroes', component: adressEntriesComponent },
  { path: '', redirectTo: '/heroes', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
