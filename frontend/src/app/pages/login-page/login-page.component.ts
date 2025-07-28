import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {

  correo = '';
  contrasena = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  iniciarSesion() {
    const datos = { correo: this.correo, contrasena: this.contrasena };
    this.authService.login(datos).subscribe({
      next: (respuesta) => {
        console.log('Token recibido:', respuesta.token);
        localStorage.setItem('token', respuesta.token);
        this.router.navigate(['/']);  // redirige al usuario tras login
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
      }
    });
  }


}
