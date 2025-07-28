import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-accion',
  imports: [],
  templateUrl: './btn-accion.component.html',
  styleUrl: './btn-accion.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnAccionComponent {

  private router = inject(Router)
  titulo = input.required<string>();
  bg = input.required<string>();
  hover = input.required<string>();
  accion = input<(dato: any) => {}>();
}
