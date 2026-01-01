interface Snap {
  id: number;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  createdAt: string;
  createdByEmail: string;
}

export interface GetSnapsResponse {
  message: string;
  data: Snap[];
}

export interface UploadSnapResponse {
  message: string;
  snap: Snap;
}
