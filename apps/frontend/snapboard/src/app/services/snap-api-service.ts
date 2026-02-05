import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable, inject } from '@angular/core';
import { API_CONSTANTS } from './snap-api-service.constants';
import {
  GetSnapsResponse,
  UploadSnapResponse,
} from './snap-api-response.model';
import { BASE_URL, PRODUCTION_BASE_URL } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class SnapApiService {
  private http = inject(HttpClient);

  get currentEnvUrl(): string {
    //based on the current client url
    //if it contains 'localhost' use dev api url
    if (window.location.hostname.includes('localhost')) {
      return BASE_URL;
    }
    return PRODUCTION_BASE_URL;
  }

  getData(): Observable<GetSnapsResponse> {
    return this.http.get(
      new URL(
        API_CONSTANTS.SNAP_FILE_SERVICE.GET_SNAPS,
        this.currentEnvUrl
      ).toString()
    ) as Observable<GetSnapsResponse>;
  }

  postData(data: FormData): Observable<UploadSnapResponse> {
    return this.http.post(
      new URL(
        API_CONSTANTS.SNAP_FILE_SERVICE.POST_UPLOAD_SNAP,
        this.currentEnvUrl
      ).toString(),
      data
    ) as Observable<UploadSnapResponse>;
  }
}
