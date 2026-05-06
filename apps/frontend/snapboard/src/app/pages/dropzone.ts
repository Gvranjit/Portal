import { Component, inject, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { SnapApiService } from '../services/snap-api-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEventType } from '@angular/common/http';

interface UploadFile {
  id: string;
  name: string;
  file: File;
  mimeType: string;
  type: 'image' | 'video' | 'other';
  previewUrl: string;
  uploading: boolean;
  progress: number;
  uploadedUrl?: string;
  error?: string;
}

@Component({
  selector: 'app-dropzone',
  imports: [MatCardModule, MatIconModule, CdkDrag, MatProgressBarModule],
  providers: [SnapApiService, MatSnackBar],
  templateUrl: './dropzone.html',
  styleUrl: './dropzone.scss',
})
export class Dropzone implements OnDestroy {
  apiService = inject(SnapApiService);
  snackBar = inject(MatSnackBar);

  files: UploadFile[] = [];
  shareableLink: string | null = null;
  isDragOver = false;

  constructor() {
    document.addEventListener('keydown', this.keydownHandler);
    document.addEventListener('paste', this.pasteHandler);
    document.addEventListener('wheel', this.scrollHandler, {
      passive: false,
    });
  }

  private keydownHandler = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      this.clearFiles();
    }
  };

  private pasteHandler = (event: ClipboardEvent): void => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            this.handleFile(file);
          }
        }
      }
    }
  };

  private scrollHandler = (event: WheelEvent): void => {
    // if (this.files.length > 0) {
    //   event.preventDefault();
    // }
  };

  dragoverHandler(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  dropHandler(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }
  handleFileSelection(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
      input.value = '';
    }
  }

  private handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.handleFile(file);
    }
  }

  private handleFile(file: File): void {
    const fileType = file.type.startsWith('video/')
      ? 'video'
      : file.type.startsWith('image/')
      ? 'image'
      : 'other';
    const previewUrl = URL.createObjectURL(file);
    const uploadFile: UploadFile = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      file,
      mimeType: file.type,
      type: fileType,
      previewUrl,
      uploading: true,
      progress: 0,
    };

    this.files.push(uploadFile);
    this.uploadFile(uploadFile);
  }

  private uploadFile(uploadFile: UploadFile): void {
    const formData = new FormData();
    formData.append('file', uploadFile.file);
    this.apiService.uploadFile(formData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          uploadFile.progress = Math.round((event.loaded / event.total) * 100);
        }

        if (event.type === HttpEventType.Response) {
          uploadFile.uploading = false;
          uploadFile.uploadedUrl = event.body?.snap.url;
          if (uploadFile.uploadedUrl) {
            this.shareableLink = uploadFile.uploadedUrl;
          }
        }
      },
      error: (error) => {
        console.error('Upload failed:', error);
        uploadFile.uploading = false;
        uploadFile.error = 'Upload failed. Please try again.';
      },
    });
  }

  public bringToFront(id: `pasted-image-${number}`): void {
    const element = document.getElementById(id);
    if (element) {
      element.style.zIndex = '9999';
    }
    this.files.forEach((_, index) => {
      const otherElement = document.getElementById(`pasted-image-${index}`);
      if (otherElement && otherElement.id !== id) {
        otherElement.style.zIndex = '1';
      }
    });
  }

  copyToClipboard(shareableLink: string | null): void {
    navigator.clipboard.writeText(shareableLink ?? '').then(
      () => {
        this.snackBar.open('Link copied to clipboard', 'Close', {
          duration: 5000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      (err) => {
        console.error('Could not copy text: ', err);
      }
    );
  }

  private clearFiles(): void {
    this.files.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    this.files = [];
    this.shareableLink = null;
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keydownHandler);
    document.removeEventListener('paste', this.pasteHandler);
    document.removeEventListener(
      'wheel',
      this.scrollHandler as EventListenerOrEventListenerObject
    );
    this.files.forEach((file) => URL.revokeObjectURL(file.previewUrl));
  }
}
