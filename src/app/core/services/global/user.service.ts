import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  ApiResponse,
  ApiDataResponse,
} from "../../interfaces/api-response.interface";
import { User } from "../../interfaces/global/user.interface";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl = `${environment.api_url}/v1/api/user`;

  constructor(private http: HttpClient) {}

  getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<User>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    return this.http
      .get<ApiResponse<User>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  createUser(userData: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(
      `${this.baseUrl}/create`,
      userData
    );
  }

  updateUser(id: string, userData: User): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(
      `${this.baseUrl}/update/${id}`,
      userData
    );
  }

  deleteUser(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}
