import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { UsuarioDashboardComponent } from "../../components/usuario-dashboard/usuario-dashboard.component";
import { UsuarioService } from '../../services/usuario.service';
import { MembresiaUsuario } from '../../interfaces/membresia-usuario';

@Component({
  selector: 'app-dashboard-page',
  imports: [UsuarioDashboardComponent],
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
