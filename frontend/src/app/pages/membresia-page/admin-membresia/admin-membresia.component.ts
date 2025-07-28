import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { EncabezadoComponent } from "../../../components/encabezado/encabezado.component";
import { TablaComponent } from "../../../components/tabla/tabla.component";
import { Membresia } from '../../../interfaces/membresia.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { MembresiaService } from '../../../services/membresia.service';

@Component({
  selector: 'app-admin-membresia',
  imports: [EncabezadoComponent, TablaComponent],
  templateUrl: './admin-membresia.component.html',
  styleUrl: './admin-membresia.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMembresiaComponent {

  private membresiaService = inject(MembresiaService);
  private authService = inject(AuthService);

  membresias = input.required<Membresia[]>();

  rol: string = '';
  columnas = [
    { header: 'Nombre', field: 'nombre', type: 'texto' },
    { header: 'Duración', field: 'duracion_dias', type: 'fecha-dias' },
    { header: 'Precio', field: 'precio', type: 'currency' },
    { header: 'Descripción', field: 'descripcion', type: '' },
  ]

  alEliminar(idEliminado: number) {
    this.membresiaService.eliminarMembresia(idEliminado).subscribe(() => {
      this.membresias().filter(u => u.id !== idEliminado);
    });
  }
}
