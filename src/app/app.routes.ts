import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { loginGuard } from './guards/login-guard';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login),
    canActivate: [loginGuard]
  },
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro').then(m => m.Registro),
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home),
    canActivate: [authGuard]
  },
  {
    path: 'quien-soy',
    loadComponent: () => import('./components/quien-soy/quien-soy').then(m => m.QuienSoy),
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];