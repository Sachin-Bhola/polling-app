import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { ViewPollComponent } from './view-poll/view-poll.component';
import { TakePollComponent } from './take-poll/take-poll.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'userdashboard', component: UserDashboardComponent, canActivate: [AuthGuard], children:
      [
        { path: '', redirectTo: 'createpoll', pathMatch: "full" },
        { path: 'createpoll', canActivate: [AuthGuard], component: CreatePollComponent },
        { path: 'viewpoll', canActivate: [AuthGuard], component: ViewPollComponent },
        { path: 'takepoll', canActivate: [AuthGuard], component: TakePollComponent }
      ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
