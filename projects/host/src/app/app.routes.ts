import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'react-child',
    loadComponent: () => import('./iframe/iframe.component').then(m => m.IframeComponent),
    data: { url: 'http://localhost:4202', title: 'React Child' }
  },
  {
    path: 'vue-child',
    loadComponent: () => import('./iframe/iframe.component').then(m => m.IframeComponent),
    data: { url: 'http://localhost:4203', title: 'Vue Child' }
  }
];

