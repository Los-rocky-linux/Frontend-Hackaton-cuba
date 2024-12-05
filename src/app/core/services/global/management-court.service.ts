import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  ApiResponse,
  ApiDataResponse,
} from "../../interfaces/api-response.interface";
import { ManagementCourt } from "../../interfaces/global/management-court.interface";

@Injectable({
  providedIn: "root",
})
export class ManagementCourtService {
  private baseUrl = `${environment.api_url}/v1/api/management-court`;

  constructor(private http: HttpClient) {}

  getAllManagementCourt(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<ManagementCourt>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    return this.http
      .get<ApiResponse<ManagementCourt>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  createManagementCourt(
    managementCourtData: ManagementCourt
  ): Observable<ApiResponse<ManagementCourt>> {
    return this.http.post<ApiResponse<ManagementCourt>>(
      `${this.baseUrl}/create`,
      managementCourtData
    );
  }

  updateManagementCourt(
    id: string,
    managementCourtData: ManagementCourt
  ): Observable<ApiResponse<ManagementCourt>> {
    return this.http.put<ApiResponse<ManagementCourt>>(
      `${this.baseUrl}/update/${id}`,
      managementCourtData
    );
  }

  deleteManagementCourt(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}
