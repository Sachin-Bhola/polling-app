import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
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
  {
    path: 'login', component: LoginComponent, canActivate: [AuthGuard]
  },
  { path: 'register', component: RegistrationComponent, canActivate: [AuthGuard] },
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
export class AppRoutingModule {

  constructor(private router: Router) {

  }

  activate() {
    if (!!localStorage.getItem('loginToken')) {
      this.router.navigate(['/userdashboard']);
      return true;
    }
  }

}
