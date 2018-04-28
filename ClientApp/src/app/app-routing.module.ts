import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AuthGuardService } from './core/guards/auth-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full', canActivate: [AuthGuardService] },
    // {
    //     path: '',
    //     component: SiteLayoutComponent,
    //     children: [
    //         { path: '', component: HomeComponent, pathMatch: 'full' },
    //         { path: 'about', component: AboutComponent }
    //     ]
    // },

    // // App routes goes here here
    // {
    //     path: '',
    //     component: AppLayoutComponent,
    //     children: [
    //         { path: 'dashboard', component: DashboardComponent },
    //         { path: 'profile', component: ProfileComponent }
    //     ]
    // },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
    { path: 'about', component: AboutComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PagenotfoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
