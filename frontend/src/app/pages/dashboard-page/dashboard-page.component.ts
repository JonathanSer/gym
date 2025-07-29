import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioDashboardComponent } from "./usuario-dashboard/usuario-dashboard.component";
import { UsuarioService } from '../../services/usuario.service';
import { MembresiaUsuario } from '../../interfaces/membresia-usuario';
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { EntrenadorDashboardComponent } from './entrenador-dashboard/entrenador-dashboard.component';

@Component({
  selector: 'app-dashboard-page',
  imports: [UsuarioDashboardComponent, AdminDashboardComponent, EntrenadorDashboardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {

  private authService = inject(AuthService);
  private usuarioService = inject(UsuarioService);

  usuario = signal<MembresiaUsuario | null>(null);

  ngOnInit(): void {
    this.authService.me().subscribe(usuario => {
      this.usuarioService.obtenerUsuarioPorId(usuario.id!).subscribe(u => {
        this.usuario.set(u)
      })
    })
  }
}
