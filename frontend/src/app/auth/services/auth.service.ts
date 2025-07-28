import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}
   private usuarioActual: Usuario | null = null;

  login(datos: { correo: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, datos);
  }

  me(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_URL}/me`).pipe(
      tap(usuario => this.usuarioActual = usuario)
    );
  }

  registrar(datos: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, datos);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    return this.http.post(`${this.API_URL}/logout`, {});
  }

  refreshToken() {
    return this.http.post<{ token: string }>(`${this.API_URL}/refresh`, {});
  }

  getUsuarioActual(): Usuario | null {
    console.log(this.usuarioActual)
    return this.usuarioActual;
  }

}
