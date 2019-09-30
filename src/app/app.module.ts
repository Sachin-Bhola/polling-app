import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegistrationComponent } from "./registration/registration.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserDashboardComponent } from "./user-dashboard/user-dashboard.component";
import { CreatePollComponent } from "./create-poll/create-poll.component";
import { ViewPollComponent } from "./view-poll/view-poll.component";
import { TakePollComponent } from "./take-poll/take-poll.component";
import { JwPaginationComponent } from "jw-angular-pagination";
import { TokenIntercepterService } from "./token-intercepter.service";
import { AuthGuard } from "./auth.guard";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    RegistrationComponent,
    UserDashboardComponent,
    CreatePollComponent,
    ViewPollComponent,
    TakePollComponent,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenIntercepterService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
