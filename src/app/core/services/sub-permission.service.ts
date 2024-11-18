import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubPermissionService {
  private apiUrl = `${environment.api_url}/v1/api/sub-permission`;

  constructor(private http: HttpClient) {}

  getAllSubPermissions(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/get-all`, {
      params: { page: page.toString(), limit: limit.toString() },
    });
  }
}
// no sirve esta tabla eliminar despues, o sea si sirve
// pero no es util