import { Component, OnDestroy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dropzone',
  imports: [MatCardModule, MatIconModule, CdkDrag],
  templateUrl: './dropzone.html',
  styleUrl: './dropzone.scss',
})
export class Dropzone implements OnDestroy {
  pastedImages: string[] = [];
  redoStack: string[] = [];
  _pastedImage: string | null = null;
  imageScale = 1;
  get pastedImage(): string | null {
    return this._pastedImage;
  }

  set pastedImage(value: string | null) {
    if (value) {
      this.pastedImages.push(value);
    }
    this._pastedImage = value;
  }

  constructor() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    document.addEventListener('paste', this.pasteHandler.bind(this));
    document.addEventListener('wheel', this.scrollHandler.bind(this), {
      passive: false,
    });
  }

  private keydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.pastedImage = null;
      this.pastedImages = [];
    } else if (event.ctrlKey && event.key.toLowerCase() === 'z') {
      this.undoHandler();
    } else if (event.ctrlKey && event.key.toLowerCase() === 'y') {
      this.redoHandler();
    }
  }

  private pasteHandler(event: ClipboardEvent): void {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            // Handle the pasted file (e.g., upload it or display it)
            this.pastedImage = URL.createObjectURL(file);
          }
        }
      }
    }
  }

  private undoHandler(): void {
    if (this.pastedImages.length > 0) {
      this.pastedImages.pop();
      this._pastedImage =
        this.pastedImages.length > 0
          ? this.pastedImages[this.pastedImages.length - 1]
          : null;
    }
  }

  private redoHandler(): void {
    // Redo functionality can be implemented if a redo stack is maintained
    if (this.redoStack.length > 0) {
      const redoImage = this.redoStack.pop()!;
      this.pastedImages.push(redoImage);
      this._pastedImage = redoImage;
    }
  }

  private scrollHandler(event: WheelEvent): void {
    if (this.pastedImage) {
      event.preventDefault();
      this.imageScale += event.deltaY * -0.001;
      // Implement zooming logic here based on scaleAmount
    }
  }

  public bringToFront(id: `pasted-image-${number}`): void {
    //set the selected component at the top (z-index wise)
    const element = document.getElementById(id);
    if (element) {
      element.style.zIndex = '9999';
    }
    // reset z-index of other elements
    this.pastedImages.forEach((_, index) => {
      const otherElement = document.getElementById(`pasted-image-${index}`);
      if (otherElement && otherElement.id !== id) {
        otherElement.style.zIndex = '1';
      }
    });
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.keydownHandler.bind(this));
    document.removeEventListener('paste', this.pasteHandler.bind(this));
  }
}
