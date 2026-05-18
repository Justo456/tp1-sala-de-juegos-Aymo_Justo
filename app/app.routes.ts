import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro').then(m => m.Registro)
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home').then(m => m.Home)
  },
  {
    path: 'quien-soy',
    loadComponent: () => import('./components/quien-soy/quien-soy').then(m => m.QuienSoy)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];