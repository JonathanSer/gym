import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-siderbar',
  imports: [RouterModule],
  templateUrl: './siderbar.component.html',
  styleUrl: './siderbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiderbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  rutasFiltradas = this.router.config
    .filter(route => route.component && route.canActivate && route.title && route.data)
    .map(route => ({
      path: route.path,
      title: route.title,
      icono: route.data ? route.data['icono'] : ''
  }));

  cerrarSesion() {
    this.authService.logout().subscribe({
      next: () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión', err);
      }
    });
  }
}
