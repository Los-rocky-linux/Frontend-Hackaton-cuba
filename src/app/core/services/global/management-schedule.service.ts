// management-schedule.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import { Schedule } from "../../interfaces/global/management-schedule.interface";
import {
  ApiResponse,
  ApiDataResponse,
} from "../../interfaces/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private baseUrl = `${environment.api_url}/v1/api/schedule`;

  constructor(private http: HttpClient) {}

  getAllSchedules(
    page: number = 1,
    limit: number = 10
  ): Observable<ApiDataResponse<Schedule>> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString());
    return this.http
      .get<ApiResponse<Schedule>>(`${this.baseUrl}/get-all`, { params })
      .pipe(map((response) => response.data));
  }

  createSchedule(scheduleData: Schedule): Observable<ApiResponse<Schedule>> {
    return this.http.post<ApiResponse<Schedule>>(
      `${this.baseUrl}/create`,
      scheduleData
    );
  }

  updateSchedule(
    id: string,
    scheduleData: Schedule
  ): Observable<ApiResponse<Schedule>> {
    return this.http.put<ApiResponse<Schedule>>(
      `${this.baseUrl}/update/${id}`,
      scheduleData
    );
  }

  deleteSchedule(id: string): Observable<ApiResponse<null>> {
    return this.http.delete<ApiResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}
