import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioMembresia } from '../interfaces/usuario-membresia.interface';
import { UsuarioRespuesta, Usuario } from '../interfaces/UsuarioRespuesta';
import { MembresiaUsuario } from '../interfaces/membresia-usuario';
import { UsuarioActualizado } from '../interfaces/usuario-actualizado.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8000/api/usuarios';
  private http = inject(HttpClient);

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl)
  }

  crearUsuario(usuario: UsuarioMembresia): Observable<UsuarioMembresia>{
    return this.http.post<UsuarioMembresia>(this.apiUrl, usuario);
  }

  obtenerUsuarioPorId(id: number): Observable<MembresiaUsuario> {
    return this.http.get<MembresiaUsuario>(`${this.apiUrl}/${id}`);
  }

  actualizarUsuario(id: number, usuario: UsuarioActualizado): Observable<UsuarioMembresia> {
    return this.http.put<UsuarioMembresia>(`${this.apiUrl}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<UsuarioMembresia> {
    return this.http.delete<UsuarioMembresia>(`${this.apiUrl}/${id}`);
  }


}
