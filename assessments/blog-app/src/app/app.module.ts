import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { HomeComponent } from './home/home/home.component';
import { AuthService } from './_services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AppGlobals } from './app.globals';

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    PostDetailsComponent,
    PostCreateComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'home', component: HomeComponent },
      { path: 'posts/list', component: PostsListComponent },
      { path: 'posts/create', component: PostCreateComponent },
      { path: 'posts/details/:postId', component: PostDetailsComponent },
      { path: 'logout', redirectTo: 'login' },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ])
  ],
  providers: [AuthService, AppGlobals],
  bootstrap: [AppComponent]
})
export class AppModule { }
