import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Enrollment,
  EnrollmentCreate,
  EnrollmentUpdate,
} from '../interfaces/enrollment.interface';
import {
  ApiResponse,
  ApiDataResponse,
} from '../interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private baseUrl = `${environment.api_url}/v1/api`;

  constructor(private http: HttpClient) {}

  getAllEnrollments(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<Enrollment>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http
      .get<ApiResponse<Enrollment>>(`${this.baseUrl}/enrollment/get-all`, {
        params,
      })
      .pipe(map((response) => response.data));
  }

  createEnrollment(
    enrollmentData: EnrollmentCreate
  ): Observable<ApiResponse<Enrollment>> {
    return this.http.post<ApiResponse<Enrollment>>(
      `${this.baseUrl}/enrollment/create`,
      enrollmentData
    );
  }

  updateEnrollment(
    id: string,
    enrollmentData: EnrollmentUpdate
  ): Observable<ApiResponse<Enrollment>> {
    return this.http.put<ApiResponse<Enrollment>>(
      `${this.baseUrl}/enrollment/update/${id}`,
      enrollmentData
    );
  }

  deleteEnrollment(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(
      `${this.baseUrl}/enrollment/delete/${id}`
    );
  }

  // Mantener estos métodos si son necesarios para el formulario de creación
  getModalities(): Observable<Array<{ _id: string; name: string }>> {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/modality/get-all`)
      .pipe(map((response) => response.data.result));
  }

  getDevelopmentTypes(): Observable<Array<{ _id: string; name: string }>> {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/development-type/get-all`)
      .pipe(map((response) => response.data.result));
  }

  getTutors(): Observable<Array<{ _id: string; name: string }>> {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/user/get-all-tutor`)
      .pipe(map((response) => response.data.result));
  }

  getAvailableStudents(): Observable<
    Array<{ _id: string; name: string; lastName: string }>
  > {
    return this.http
      .get<ApiResponse<any>>(`${this.baseUrl}/user/get-all-students`)
      .pipe(map((response) => response.data.result));
  }
}
