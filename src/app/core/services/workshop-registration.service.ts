import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  WorkshopRegistration,
  WorkshopRegistrationCreate,
  WorkshopRegistrationUpdate,
} from '../interfaces/workshop-registration.interface';
import {
  ApiResponse,
  ApiDataResponse,
} from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class WorkshopRegistrationService {
  private baseUrl = `${environment.api_url}/v1/api`;

  constructor(private http: HttpClient) {}

  getAllRegistrations(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<WorkshopRegistration>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http
      .get<ApiResponse<WorkshopRegistration>>(
        `${this.baseUrl}/workshop-registration/get-all`,
        { params }
      )
      .pipe(map((response) => response.data));
  }

  /**
   * Obtiene una inscripción al taller específica por su ID.
   */
  getRegistrationById(
    id: string
  ): Observable<ApiResponse<WorkshopRegistration>> {
    return this.http.get<ApiResponse<WorkshopRegistration>>(
      `${this.baseUrl}/workshop-registration/get/${id}`
    );
  }

  /**
   * Crea una nueva inscripción al taller.
   */
  createRegistration(
    registrationData: WorkshopRegistrationCreate
  ): Observable<ApiResponse<WorkshopRegistration>> {
    return this.http.post<ApiResponse<WorkshopRegistration>>(
      `${this.baseUrl}/workshop-registration/create`,
      registrationData
    );
  }

  /**
   * Actualiza una inscripción al taller existente.
   */
  updateRegistration(
    id: string,
    registrationData: WorkshopRegistrationUpdate
  ): Observable<ApiResponse<WorkshopRegistration>> {
    return this.http.put<ApiResponse<WorkshopRegistration>>(
      `${this.baseUrl}/workshop-registration/update/${id}`,
      registrationData
    );
  }

  /**
   * Elimina una inscripción al taller por su ID.
   */
  deleteRegistration(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${this.baseUrl}/workshop-registration/delete/${id}`
    );
  }

  /**
   * Obtiene todos los períodos de inducción disponibles.
   */
  getInductionPeriods(): Observable<
    Array<{ _id: string; name: string; description: string }>
  > {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/induction-period/get-all`)
      .pipe(map((response) => response.data.result));
  }
}
