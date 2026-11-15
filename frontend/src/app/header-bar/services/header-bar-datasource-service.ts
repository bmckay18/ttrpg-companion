import { Injectable } from '@angular/core';
import { BaseApiClient } from '../../core/services/api-client/base-api-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderBarDatasourceService extends BaseApiClient {
  getDisplayName(): Observable<string> {
    return this.http.get(`${this.baseUrl}/user/display-name`, {
      responseType: 'text',
    });
  }
}
