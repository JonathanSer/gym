import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membresia } from '../interfaces/membresia.interface';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  private apiUrl = 'http://localhost:8000/api/membresias';

  private http = inject(HttpClient)

  obtenerMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.apiUrl);
  }

  obtenerMembresiaPorId(id: number): Observable<Membresia> {
    return this.http.get<Membresia>(`${this.apiUrl}/${id}`)
  }

  crearMembresia(membresia: Membresia): Observable<Membresia> {
    return this.http.post<Membresia>(this.apiUrl, membresia);
  }

  actualizarMembresia(id: number, membresia: Membresia): Observable<Membresia> {
    return this.http.put<Membresia>(`${this.apiUrl}/${id}`, membresia);
  }

  eliminarMembresia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
