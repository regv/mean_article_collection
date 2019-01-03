import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { FlashMessagesModule } from "angular2-flash-messages";
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PostsComponent } from './components/posts/posts.component';
import { AddPostComponent } from './components/add-post/add-post.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { EditComponent } from './components/edit/edit.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ValidateService } from "./services/validate.service";
import { DataService } from "./services/data.service";
import { GuardService } from "./guard/guard.service";


export function tokenGetter() {
  return localStorage.getItem('id_token');
}

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[GuardService] },
  { path: 'post/add', component: AddPostComponent, canActivate:[GuardService] },
  { path: 'posts', component: PostsComponent, canActivate:[GuardService] },
  { path: 'post/:id', component: EditComponent, canActivate:[GuardService] },
  { path: 'about', component: AboutComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    PostsComponent,
    AddPostComponent,
    RegisterComponent,
    LoginComponent,
    FooterComponent,
    EditComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['localhost:4000/user/authenticate']
      }
    })
  ],
  providers: [
    ValidateService,
    DataService,
    GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
