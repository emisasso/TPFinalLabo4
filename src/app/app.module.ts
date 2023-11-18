import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponentComponent } from './components/home-components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPageComponent } from './components/home-components/user-page/user-page.component';
import { FavoritesPageComponent } from './components/home-components/favorites-page/favorites-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponentComponent,
    LandingComponent,
    RegisterComponent,
    UserPageComponent,
    FavoritesPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
