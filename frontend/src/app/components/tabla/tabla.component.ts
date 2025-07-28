import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { BtnAccionComponent } from "../btn-accion/btn-accion.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  imports: [DecimalPipe, BtnAccionComponent, DatePipe, TitleCasePipe],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TablaComponent {

  private router = inject(Router);

  rutaEditar = input.required<string>();

  eliminado = output<number>();

  data = input.required<any[]>();
  columnas = input.required<{ header: string, field: string, type?: string }[]>();

  getValue(item: any, field: string): any {
    return field.split('.').reduce((acc, part) => acc && acc[part], item);
  }

  getId(item: unknown): number | undefined {
    return (item as any)?.id;
  }

  abrirEditar(id: number){
    this.router.navigate([`/${this.rutaEditar()}/${id}`])
  }

  eliminar(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Eliminar ID:', id);

        this.eliminado.emit(id);

        Swal.fire(
          '¡Eliminado!',
          'El elemento ha sido eliminado.',
          'success'
        );
      }
    });
  }
}
