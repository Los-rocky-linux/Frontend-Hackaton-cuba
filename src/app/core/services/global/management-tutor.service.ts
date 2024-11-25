import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  ApiResponse,
  ApiDataResponse,
} from "../../interfaces/api-response.interface";
import { ManagementTutor } from "../../interfaces/global/management-tutor.interface";

@Injectable({
  providedIn: "root",
})
export class ManagementTutorService {
  private baseUrl = `${environment.api_url}/v1/api/management-tutor`;

  constructor(private http: HttpClient) {}

  getAllManagementTutors(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<ManagementTutor>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    return this.http
      .get<ApiResponse<ManagementTutor>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  createManagementTutor(
    managementTutorData: ManagementTutor
  ): Observable<ApiResponse<ManagementTutor>> {
    return this.http.post<ApiResponse<ManagementTutor>>(
      `${this.baseUrl}/create`,
      managementTutorData
    );
  }

  updateManagementTutor(
    id: string,
    managementTutorData: ManagementTutor
  ): Observable<ApiResponse<ManagementTutor>> {
    return this.http.put<ApiResponse<ManagementTutor>>(
      `${this.baseUrl}/update/${id}`,
      managementTutorData
    );
  }

  deleteManagementTutor(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }

}
