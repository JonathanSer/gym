import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:8000/api/asistencias';

  getAsistencias(): Observable<any> {
    return this.http.get<any>(this.API_URL);
  }

  obtenerAsistenciaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API_URL}/${id}`);
  }

  crearAsistencia(asistencia: any): Observable<any> {
    return this.http.post<any>(this.API_URL, asistencia);
  }

  actualizarAsistencia(id: number, asistencia: any): Observable<any> {
    return this.http.put<any>(`${this.API_URL}/${id}`, asistencia);
  }

  eliminarAsistencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }

}
