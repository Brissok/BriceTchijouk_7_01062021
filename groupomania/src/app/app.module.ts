import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostComponent } from './post/post.component';
import { PostViewComponent } from './post-view/post-view.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { PostFormComponent } from './post-form/post-form.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ProfilComponent } from './profil/profil.component';
import { ProfilFormComponent } from './profil-form/profil-form.component';

import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';
import { LinkService } from './services/link';
import { AuthInterceptor } from './interceptors/auth-interceptor';


const appRoutes: Routes = [
  { path: 'posts', canActivate: [AuthGuard], component: PostViewComponent },
  { path: 'posts/:id', canActivate: [AuthGuard], component: SinglePostComponent },
  { path: 'new-post', canActivate: [AuthGuard], component: PostFormComponent },
  { path: 'modify-post/:id', canActivate: [AuthGuard], component: PostFormComponent },
  { path: 'modify-profil/:id', canActivate: [AuthGuard], component: ProfilFormComponent },
  { path: 'profil', canActivate: [AuthGuard], component: ProfilComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: SignupComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    PostListComponent,
    PostComponent,
    PostViewComponent,
    SinglePostComponent,
    FourOhFourComponent,
    PostFormComponent,
    LoginComponent,
    HeaderComponent,
    ProfilComponent,
    ProfilFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    PostService,
    UserService,
    AuthService,
    AuthGuard,
    LinkService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
