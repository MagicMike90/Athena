import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from '../../core/components/site-layout/site-layout.component';
import { LoginComponent } from './login-form/login.component';
import { RegisterComponent } from './register-form/register.component';

const routes: Routes = [
    {
        path: 'user',
        component: SiteLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
