// group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupResponse, Group } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = `${environment.api_url}/v1/api/group`;

  constructor(private http: HttpClient) {}

  getAllGroups(page: number = 1, limit: number = 10): Observable<GroupResponse> {
    const params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.http.get<GroupResponse>(`${this.baseUrl}/get-all-groups`, { params });
  }
}
