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
  {
    path: 'ahorcado',
    loadComponent: () => import('./components/juegos/ahorcado/ahorcado').then(m => m.Ahorcado),
    canActivate: [authGuard]
  },
  {
    path: 'mayor-menor',
    loadComponent: () => import('./components/juegos/mayor-menor/mayor-menor').then(m => m.MayorMenor),
    canActivate: [authGuard]
  },
  {
    path: 'chat',
    loadComponent: () => import('./components/chat/chat').then(m => m.Chat),
    canActivate: [authGuard]
  },
  {
    path: 'preguntados',
    loadComponent: () => import('./components/juegos/preguntados/preguntados').then(m => m.Preguntados),
    canActivate: [authGuard]
  },
  {
    path: 'adivina-numero',
    loadComponent: () => import('./components/juegos/adivina-numero/adivina-numero').then(m => m.AdivinaNumero),
    canActivate: [authGuard]
  },
  
  {
    path: 'resultados',
    loadComponent: () => import('./components/resultados/resultados').then(m => m.Resultados),
    canActivate: [authGuard]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];