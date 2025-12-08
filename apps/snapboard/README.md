# Purpose

This micro frontend provides a reusable drag-and-drop image upload UI. It does not handle file storage. Consumers must supply their own upload API.

## What this MFE does

- Drag/drop zone
- File selector (Gallery with thumbnails) (simple)
- Preview (Simple)
- Emits events
- Accepts inputs like upload URL or custom upload function

## What this MFE does not do

- No backend
- No authentication
- No file hosting
- No API calls unless the host app provides the service

## Quick usage example

```html
<mfe-uploader
  [uploadHandler]="myUploadFunction"
  (fileDropped)="onFile($event)">
</mfe-uploader>
```

## Styling

- Bootstrap for grid layouts
- Angular material for components

# Module Federation

Since this project is going to be an MFE, Module federation will be incoroporated 

[Reference](https://module-federation.io/practice/frameworks/angular/angular-mfe)