import { Route } from '@angular/router';
import { Dropzone } from './pages/dropzone';
import { ImageViewer } from './pages/image-viewer/image-viewer';

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
  { path: 'i/:filename', component: ImageViewer },
  {
    path: '**',
    redirectTo: 'dropzone',
  },
];
