import { Route } from '@angular/router';
import { Dropzone } from './pages/dropzone';
import { ImageViewer } from './pages/image-viewer/image-viewer';
import { VideoPlayer } from './pages/video-player/video-player';

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
    path: 'video/:videoId',
    component: VideoPlayer,
  },
  { path: 'i/:filename', component: ImageViewer },
  {
    path: '**',
    redirectTo: 'dropzone',
  },
];
