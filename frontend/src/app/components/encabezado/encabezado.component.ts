import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BtnAgregarComponent } from "../btn-agregar/btn-agregar.component";

@Component({
  selector: 'app-encabezado',
  imports: [BtnAgregarComponent],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncabezadoComponent {

  titulo = input.required<string>();
  descripcion = input.required<string>();

  textoAgregar = input.required<string>();
  ruta = input.required<string>();

}
