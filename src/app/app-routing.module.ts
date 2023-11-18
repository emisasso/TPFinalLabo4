import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponentComponent } from './components/home-components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './core/services/guards/auth-guard';
import { UserPageComponent } from './components/home-components/user-page/user-page.component';
import { FavoritesPageComponent } from './components/home-components/favorites-page/favorites-page.component';


const routes: Routes = [
  {
    path: 'landing',
    component: LandingComponent,
  },
  {
    path: 'home',
    component: HomeComponentComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user',
    component: UserPageComponent
  },
  {
    path: 'user/favorites',
    component: FavoritesPageComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LandingComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
