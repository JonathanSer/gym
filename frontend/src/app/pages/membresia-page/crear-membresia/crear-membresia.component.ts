import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembresiaService } from '../../../services/membresia.service';
import { Router } from '@angular/router';
import { Membresia } from '../../../interfaces/membresia.interface';

@Component({
  selector: 'app-crear-membresia',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-membresia.component.html',
  styleUrl: './crear-membresia.component.css',
  standalone: true,
})
export class CrearMembresiaComponent implements OnInit {

  private fb = inject(FormBuilder);
  private membresiaService = inject(MembresiaService);
  private router = inject(Router);

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    duracion_dias: ['', Validators.required],
    duracion_custom: [null],
    precio: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {
    // Escuchar cambios para activar validadores dinámicos
    this.formulario.get('duracion_dias')?.valueChanges.subscribe(valor => {
      const customControl = this.formulario.get('duracion_custom');
      if (valor! + '' === 'custom') {
        customControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        customControl?.clearValidators();
      }
      customControl?.updateValueAndValidity();
    });
  }

  guardar() {
    if (this.formulario.invalid) return;

    const duracion = this.formulario.get('duracion_dias')!.value! + '' === 'custom'
      ? this.formulario.get('duracion_custom')!.value
      : this.formulario.get('duracion_dias')!.value;

    const membresia: Membresia = {
      nombre: this.formulario.get('nombre')!.value!,
      duracion_dias: Number(duracion!),
      precio: this.formulario.get('precio')!.value!,
      descripcion: this.formulario.get('descripcion')!.value ?? ''
    };

    console.log(membresia);

    this.membresiaService.crearMembresia(membresia).subscribe({
       next: () => this.router.navigate(['/membresias']),
       error: (err) => console.error('Error al crear membresía:', err)
    });
  }

  dividirTexto(): void {
    const lineas = this.formulario.get('descripcion')!.value!.split('\n');
    console.log(lineas);
  }

  getDuracionDias(): number {
    const valor = this.formulario.get('duracion_dias')?.value;
    if (valor! + '' === 'custom') {
      return this.formulario.get('duracion_custom')?.value ?? 0;
    }
    return Number(valor) ?? 0;
  }

  cancelar() {
    this.router.navigate(['/membresias']);
  }

  volver() {
    this.router.navigate(['/membresias']);
  }

}
