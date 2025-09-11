import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards';

const loadPostsPage = () => import('@features/posts/posts-list/posts-list.component');
const loadLoginPage = () => import('@features/auth/login/login.component');
const loadRegisterPage = () => import('@features/auth/register/register.component');

export const routes: Routes = [
  {
    path: '',
    loadComponent: loadPostsPage,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    loadComponent: loadLoginPage,
    canActivate: [guestGuard],
  },
  {
    path: 'register',
    loadComponent: loadRegisterPage,
    canActivate: [guestGuard],
  },
];
