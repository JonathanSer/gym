import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembresiaActual } from '../interfaces/membresia-actual.interface';
//import { MembresiaActual } from '../interfaces/UsuarioRespuesta';

@Injectable({
  providedIn: 'root'
})
export class MembresiaUsuarioService {

  private http = inject(HttpClient);

  private API_URL = 'http://localhost:8000/api/membresias-usuarios'

  getMembresiaUsuario() {
    return this.http.get<MembresiaActual[]>(this.API_URL);
  }

  obtenerMembresiaUsuarioPorId(id: number): Observable<MembresiaActual> {
    return this.http.get<MembresiaActual>(`${this.API_URL}/${id}`);
  }

  crearMembresia(membresiaUsuario: MembresiaActual): Observable<MembresiaActual> {
    return this.http.post<MembresiaActual>(this.API_URL, membresiaUsuario);
  }

}
