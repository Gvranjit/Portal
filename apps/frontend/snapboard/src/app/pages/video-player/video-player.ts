import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  VgCoreModule,
  VgMediaDirective,
} from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { SnapApiService } from '../../services/snap-api-service';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
  ],
  providers: [SnapApiService],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayer implements OnInit {
  private route = inject(ActivatedRoute);
  private snapApiService = inject(SnapApiService);

  videoId = '';
  videoTitle = 'Video Player';
  videoSources: Array<string> = [];

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('videoId');
    if (videoId) {
      this.videoId = videoId;
      this.videoTitle = videoId;
      const sourceUrl = `${this.snapApiService.currentEnvUrl}/i/${videoId}`;
      this.videoSources = [sourceUrl];
    }
  }
}
