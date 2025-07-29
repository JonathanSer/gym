import { Component, computed, inject, input, signal } from '@angular/core';
import { MembresiaUsuario } from '../../../interfaces/membresia-usuario';
import { DatePipe } from '@angular/common';
import { AsistenciaService } from '../../../services/asistencia.service';
import { Asistencia } from '../../../interfaces/asistencia.interface';

@Component({
  selector: 'app-usuario-dashboard',
  imports: [DatePipe],
  templateUrl: './usuario-dashboard.component.html',
  styleUrl: './usuario-dashboard.component.css',
})
export class UsuarioDashboardComponent {

  private asistenciaService = inject(AsistenciaService);

  usuario = input.required<MembresiaUsuario>();
  entradaSalida = signal<boolean>(true);
  asistencias = signal<Asistencia | null>(null);

  textoRegistro = computed(() => {
    return this.entradaSalida() ? 'Entrada' : 'Salida';
  });

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

  ngOnInit(): void {
    this.asistenciaService.getAsistencias().subscribe(asistencias => {
      this.asistencias.set(asistencias);
    })
  }

  membresia(): string {
     const membresia = this.usuario().membresia_actual?.membresia?.nombre;
     if(membresia) return `Membresía ${membresia}`;
     return 'Sin membresia';
  }

  estado(): string {
    if(this.usuario().membresia_actual?.activa === 0) return 'Expirada';
    if(this.usuario().membresia_actual?.activa === 1) return 'Activa';
    if(this.usuario().membresia_actual?.activa === 2) return 'Pendiente';
    return 'Inactiva'
  }

  diasFaltantes(): number {
    const inicio = this.usuario().membresia_actual?.fecha_inicio;
    const expiracion = this.usuario().membresia_actual?.fecha_expiracion;

    if (inicio && expiracion) {
      const fechaInicio = new Date(inicio);
      const fechaExpiracion = new Date(expiracion);

      const diferenciaMs = fechaExpiracion.getTime() - fechaInicio.getTime();

      const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      return dias;
    }

    return 0;
  }

  diasTranscurridos(): number {
    const inicio = this.usuario().membresia_actual?.fecha_inicio;
    const actual = new Date();

    if (inicio) {
      const fechaInicio = new Date(inicio);
      const fechaActual = actual;

      const diferenciaMs = fechaActual.getTime() - fechaInicio.getTime();

      const dias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      return dias;
    }

    return 0;
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

  precioPorDia(): number {
    const precio = this.usuario().membresia_actual?.membresia?.precio!;
    const duracion = this.usuario().membresia_actual?.membresia?.duracion_dias!;
    const resultado = +precio / +duracion;
    return +resultado.toFixed(2) || 0;
  }

  listarDescripcionMembresia(descripcion: string): string[] {
    const lista = descripcion.split('\n')
    return lista;
  }

  cambioTextoAsistencia() {

    const membresia = this.usuario().membresia_actual

    if (this.textoRegistro() === 'Entrada' && membresia) {
      const asistencia: Asistencia = {
        usuario_id: this.usuario().id!,
        usuario_membresia_id: this.usuario().membresia_actual?.id!,
        fecha_hora_entrada: this.formatearFecha(new Date()),
        fecha_hora_salida: null
      };

      console.log(asistencia);

      this.asistenciaService.crearAsistencia(asistencia).subscribe({
        next: respuesta => {
          console.log(respuesta);
        },
        error: error => {
          console.error(error);
          if (error.status === 422) {
            console.log('Error', 'Verifica los campos enviados. Puede haber un error en la validación.', 'error');
          } else {
            console.log('Error', 'Ocurrió un error al registrar la asistencia.', 'error');
          }
        }
      });
    }


    this.entradaSalida.set(!this.entradaSalida());

  }

  formatearFecha(date: Date): string {
    return date.toISOString().slice(0, 19).replace('T', ' ');
  }

  fechaInicio(): Date | string {
    if(this.usuario().membresia_actual?.fecha_inicio) return this.usuario().membresia_actual?.fecha_inicio!;
    return 'Sin fecha'
  }

  fechaFin(): Date | string {
    if(this.usuario().membresia_actual?.fecha_inicio) return this.usuario().membresia_actual?.fecha_expiracion!;
    return 'Sin fecha'
  }

}
