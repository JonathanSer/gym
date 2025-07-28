import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-agregar',
  imports: [],
  templateUrl: './btn-agregar.component.html',
  styleUrl: './btn-agregar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnAgregarComponent {

  private router = inject(Router);

  texto = input.required<string>();
  ruta = input.required<string>();

  abrir() {
    this.router.navigate([this.ruta()]);
  }
}
