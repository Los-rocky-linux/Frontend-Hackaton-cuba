import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  ApiResponse,
  ApiDataResponse,
} from "../../interfaces/api-response.interface";
import { ManagementTopic } from "../../interfaces/global/management-topic.interface";

@Injectable({
  providedIn: "root",
})
export class ManagementTopicService {
  private baseUrl = `${environment.api_url}/v1/api/management-topic`;

  constructor(private http: HttpClient) {}

  getAllManagementTopics(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<ManagementTopic>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    return this.http
      .get<ApiResponse<ManagementTopic>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  // getManagementTopicByEnrollment(
  //   enrollmentId: string
  // ): Observable<ManagementTopic> {
  //   return this.http
  //     .get<ApiResponse<ApiDataResponse<any>>>(
  //       `${this.baseUrl}/get-by-enrollment/${enrollmentId}`
  //     )
  //     .pipe(
  //       map((response) => {
  //         // Extrae manualmente la estructura del ManagementTopic desde el campo `data`
  //         const data = response.data as any; // Utiliza `any` para evitar conflictos
  //         const managementTopic: ManagementTopic = {
  //           _id: data._id || "", // Si no viene en la respuesta, deja un valor por defecto
  //           assignedTopic: data.assignedTopic || "",
  //           enrollment: data.enrollment || "",
  //           statusManagementTopic: data.statusManagementTopic || "",
  //         };
  //         return managementTopic;
  //       })
  //     );
  // }

  getManagementTopicByEnrollment(
    enrollmentId: string
  ): Observable<{ _id: string; assignedTopic: string }> {
    return this.http
      .get<any>(`${this.baseUrl}/get-by-enrollment/${enrollmentId}`)
      .pipe(
        map((response) => {
          // Accede a los datos anidados sin romper las interfaces actuales
          const managementTopic = response.data?.assignedTopic?.result[0];
          if (!managementTopic) {
            throw new Error("No se encontró el tema asignado");
          }
          return managementTopic; // Devuelve el primer elemento
        })
      );
  }

  createManagementTopic(
    managementTopicData: ManagementTopic
  ): Observable<ApiResponse<ManagementTopic>> {
    return this.http.post<ApiResponse<ManagementTopic>>(
      `${this.baseUrl}/create`,
      managementTopicData
    );
  }

  updateManagementTopic(
    id: string,
    managementTopicData: ManagementTopic
  ): Observable<ApiResponse<ManagementTopic>> {
    return this.http.put<ApiResponse<ManagementTopic>>(
      `${this.baseUrl}/update/${id}`,
      managementTopicData
    );
  }

  deleteManagementTopic(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}
