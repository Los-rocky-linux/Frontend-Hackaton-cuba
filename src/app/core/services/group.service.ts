// group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GroupResponse } from '../interfaces/group.interface';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = `${environment.api_url}/v1/api/group`;

  constructor(private http: HttpClient) {}

  getAllGroups(
    page: number = 1,
    limit: number = 10,
    filters: any = {} // Acepta un objeto de filtros como parámetro opcional
  ): Observable<GroupResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    // Añadir filtros a los parámetros
    if (filters) {
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (value) {
          if (Array.isArray(value) && value.length > 0) {
            params = params.append(key, value.join(','));
          } else if (value instanceof Date) {
            params = params.append(key, value.toISOString());
          } else if (key === 'creationDate' && value) {
            const [startDate, endDate] = value;
            params = params.append('startDate', startDate.toISOString());
            params = params.append('endDate', endDate.toISOString());
          } else {
            params = params.append(key, value);
          }
        }
      });
    }

    return this.http.get<GroupResponse>(`${this.baseUrl}/get-all-groups`, {
      params,
    });
  }
}
