import { Component, inject, input, signal } from '@angular/core';
import { Membresia } from '../../../interfaces/membresia.interface';
import { MembresiaService } from '../../../services/membresia.service';
import { MetodoPagoService } from '../../../services/metodo-pago.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-membresia',
  imports: [],
  templateUrl: './usuario-membresia.component.html',
  styleUrl: './usuario-membresia.component.css'
})
export class UsuarioMembresiaComponent {

  private metodoPagoService = inject(MetodoPagoService);
  private router = inject(Router);

  membresias = input.required<Membresia[]>();

  listarDescripcionMembresia(descripcion: string): string[] {
    const lista = descripcion.split('\n')
    return lista;
  }

  planSeleccionado(membresia: Membresia) {
    this.metodoPagoService.setData(membresia);
    this.router.navigate([`/membresias/metodo-pago/${membresia.id}`])
  }

}
