import { Component, inject, OnInit } from '@angular/core';
import { MembresiaService } from '../../services/membresia.service';
import { Membresia } from '../../interfaces/membresia.interface';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { TablaComponent } from '../../components/tabla/tabla.component';
import { AuthService } from '../../auth/services/auth.service';
import { UsuarioMembresiaComponent } from "./usuario-membresia/usuario-membresia.component";
import { AdminMembresiaComponent } from "./admin-membresia/admin-membresia.component";

@Component({
  selector: 'app-membresia-page',
  imports: [UsuarioMembresiaComponent, AdminMembresiaComponent],
  templateUrl: './membresia-page.component.html',
  styleUrl: './membresia-page.component.css'
})
export class MembresiaPageComponent implements OnInit {
  private membresiaService = inject(MembresiaService);
  private authService = inject(AuthService);

  membresias: Membresia[] = [];
  rol: string = '';
  columnas = [
    { header: 'Nombre', field: 'nombre', type: 'texto' },
    { header: 'Duración', field: 'duracion_dias', type: 'fecha-dias' },
    { header: 'Precio', field: 'precio', type: 'currency' },
    { header: 'Descripción', field: 'descripcion', type: '' },
  ]

  ngOnInit() {
    this.cargarRol();
    this.cargarMembresias();
  }

  cargarRol() {
    this.authService.me().subscribe(data => {
      this.rol = data.rol;
    });
  }

  cargarMembresias() {
    this.membresiaService.obtenerMembresias().subscribe({
      next: (data) => {
        this.membresias = data;
      }
    });
  }

  alEliminar(idEliminado: number) {
    this.membresiaService.eliminarMembresia(idEliminado).subscribe(() => {
      this.membresias = this.membresias.filter(u => u.id !== idEliminado);
    });
  }

  /*
  listarDescripcionMembresia(descripcion: string): string[] {
    const lista = descripcion.split('\n')
    return lista;
  }*/

}

