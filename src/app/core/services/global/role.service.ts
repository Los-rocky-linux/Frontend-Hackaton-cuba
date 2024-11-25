import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { Role } from "../../constants/global/role.interface";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private baseUrl = `${environment.api_url}/v1/api/rol`;

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http
      .get<{ data: { result: Role[] } }>(`${this.baseUrl}/get-all`)
      .pipe(map((response) => response.data.result));
  }
}
