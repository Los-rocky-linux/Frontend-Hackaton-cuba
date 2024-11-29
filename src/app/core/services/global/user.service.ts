import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  ApiResponse,
  ApiDataResponse,
} from '../../interfaces/api-response.interface';
import { User } from '../../interfaces/global/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.api_url}/v1/api/user`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Cargar el usuario desde localStorage si existe
    const userJson = localStorage.getItem('currentUser');
    const user = userJson ? JSON.parse(userJson) : null;
    this.currentUserSubject.next(user);
  }

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http
      .post<ApiResponse<{ token: string; user: User }>>(
        `${this.baseUrl}/login`,
        body
      )
      .pipe(
        tap((response) => {
          if (response && response.data) {
            const { token, user } = response.data;

            // Guardar el token y el usuario en localStorage
            localStorage.setItem('authToken', token);
            localStorage.setItem('currentUser', JSON.stringify(user));

            // Actualizar el currentUserSubject
            this.currentUserSubject.next(user);
          }
        })
      );
  }

   getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getAllUsers(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<User>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http
      .get<ApiResponse<User>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  getAllTutors(): Observable<ApiDataResponse<User>> {
    return this.http
      .get<ApiResponse<User>>(`${this.baseUrl}/get-all-tutor`)
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
