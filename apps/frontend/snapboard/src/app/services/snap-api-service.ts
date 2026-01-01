import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { getSnapApiUrl } from './snap-api-service.constants';
import {
  GetSnapsResponse,
  UploadSnapResponse,
} from './snap-api-response.model';

@Injectable({
  providedIn: 'root',
})
export class SnapApiService {
  private http = inject(HttpClient);

  getData(): Observable<GetSnapsResponse> {
    return this.http.get(
      getSnapApiUrl('GET_SNAPS')
    ) as Observable<GetSnapsResponse>;
  }

  postData(data: FormData): Observable<UploadSnapResponse> {
    return this.http.post(
      getSnapApiUrl('POST_UPLOAD_SNAP'),
      data
    ) as Observable<UploadSnapResponse>;
  }
}
