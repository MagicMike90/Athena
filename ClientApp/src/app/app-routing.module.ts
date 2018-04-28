import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    {
        path: '', canActivate: [AuthGuard], children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'about', component: AboutComponent },
        ]
    },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
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
