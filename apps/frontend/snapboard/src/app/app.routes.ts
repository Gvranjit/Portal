import { Route } from '@angular/router';
import { Dropzone } from './pages/dropzone';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dropzone',
    pathMatch: 'full',
  },
  {
    path: 'dropzone',
    component: Dropzone,
  },
  {
    path: '**',
    redirectTo: 'dropzone',
  },
];
