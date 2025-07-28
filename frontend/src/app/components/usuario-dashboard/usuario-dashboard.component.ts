import { Component, input } from '@angular/core';
import { MembresiaUsuario } from '../../interfaces/membresia-usuario';
import { DatePipe, I18nSelectPipe } from '@angular/common';

@Component({
  selector: 'app-usuario-dashboard',
  imports: [DatePipe, I18nSelectPipe],
  templateUrl: './usuario-dashboard.component.html',
  styleUrl: './usuario-dashboard.component.css',
})
export class UsuarioDashboardComponent {

  usuario = input.required<MembresiaUsuario>();

  meses = {
    'July': 'julio',
    'August': 'agosto',
    'September': 'septiembre',
    'October': 'octubre',
    'November': 'noviembre',
    'December': 'diciembre',
    'January': 'enero',
    'February': 'febrero',
    'March': 'marzo',
    'April': 'abril',
    'May': 'mayo',
    'June': 'junio',
    'other': 'mes desconocido'
  }

  estado(): string {
    if(this.usuario().membresia_actual?.activa === 1) return 'Activa';
    if(this.usuario().membresia_actual?.activa === 2) return 'Pendiente';
    return 'Expirada'
  }

  diasFaltantes(): number | null {
    const inicio = this.usuario().membresia_actual?.fecha_inicio;
    const expiracion = this.usuario().membresia_actual?.fecha_expiracion;

    if (inicio && expiracion) {
      const fechaInicio = new Date(inicio);
      const fechaExpiracion = new Date(expiracion);

      // Diferencia en milisegundos
      const diferenciaMs = fechaExpiracion.getTime() - fechaInicio.getTime();

      // Convertir a días
      const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      return dias;
    }

    return null;
  }

  diasTranscurridos(): number | null {
    const inicio = this.usuario().membresia_actual?.fecha_inicio;
    const actual = new Date();

    if (inicio) {
      const fechaInicio = new Date(inicio);
      const fechaActual = actual;

      // Diferencia en milisegundos
      const diferenciaMs = fechaActual.getTime() - fechaInicio.getTime();

      // Convertir a días
      const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      return dias;
    }

    return null;
  }

  progresoMembresia(): string {
    const inicio = this.usuario().membresia_actual?.fecha_inicio;
    const expiracion = this.usuario().membresia_actual?.fecha_expiracion;

    if (inicio && expiracion) {
      const fechaInicio = new Date(inicio);
      const fechaExpiracion = new Date(expiracion);
      const fechaActual = new Date();

      const total = fechaExpiracion.getTime() - fechaInicio.getTime();
      const transcurrido = fechaActual.getTime() - fechaInicio.getTime();

      const porcentaje = Math.max(0, Math.min(100, (transcurrido / total) * 100));

      return porcentaje.toFixed(2) + '%'; // Ejemplo: "42.75%"
    }

    return '0%';
  }

  precioPorDia(): number | null {
    const precio = this.usuario().membresia_actual?.membresia?.precio!;
    const duracion = this.usuario().membresia_actual?.membresia?.duracion_dias!;
    const resultado = +precio / +duracion;
    return +resultado.toFixed(2);
  }

  listarDescripcionMembresia(descripcion: string): string[] {
    const lista = descripcion.split('\n')
    return lista;
  }

}
