import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
        //console.log('Token recibido:', respuesta.token);
        localStorage.setItem('token', respuesta.token);
        this.router.navigate(['/']);  // redirige al usuario tras login
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: error.error?.message || 'No se pudo iniciar sesión. Por favor verifica tus datos.',
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }


}
