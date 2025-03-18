import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { StoreComponent } from './store/store.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {TwoFactorAuthComponent} from "./two-factor-auth/two-factor-auth.component";

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'two-factor-auth', component: TwoFactorAuthComponent},
  {path:'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'store', component: StoreComponent},
  { path: '**', redirectTo: '/login' } // Catch all undefined routes
];


