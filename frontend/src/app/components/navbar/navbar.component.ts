import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  usuario = signal<Usuario | null>(null);

  currentUrl = signal(this.router.url);

  rutaFiltrada = computed(() => {
    const config = this.router.config;

    const ruta = config.find(route => {
      if (!route.path || !route.component || !route.title || !route.canActivate) return false;
      const basePath = '/' + route.path.split('/:')[0];
      return this.currentUrl().startsWith(basePath);
    });

    return ruta?.title ?? 'Inicio';
  });

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentUrl.set(this.router.url);
    });

    this.authService.me().subscribe(usuario => {
      this.usuario.set(usuario);
    })
  }

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
