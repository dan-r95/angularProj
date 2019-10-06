import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdressEntriesComponent } from './entries/adress-entry.component';
import { AdressDetailComponent } from './adress-detail/adress-detail.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'adresses', component: AdressEntriesComponent },
    { path: '', redirectTo: '/adresses', pathMatch: 'full' },
    { path: 'adressDetail/:id', component: AdressDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
