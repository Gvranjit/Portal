import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnapApiService } from '../../services/snap-api-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './image-viewer.html',
  styleUrl: './image-viewer.scss',
})
export class ImageViewer implements OnInit {
  private route = inject(ActivatedRoute);
  private snapApiService = inject(SnapApiService);

  imageUrl = '';

  ngOnInit() {
    const filename = this.route.snapshot.paramMap.get('filename');
    if (filename) {
      // Build the full URL using the service base URL
      this.imageUrl = `${this.snapApiService.currentEnvUrl}/i/${filename}`;
    }
  }
}
