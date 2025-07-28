import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MembresiaService } from '../../../services/membresia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Membresia } from '../../../interfaces/membresia.interface';

@Component({
  selector: 'app-editar-membresia-page',
  imports: [ReactiveFormsModule],
  templateUrl: './editar-membresia-page.component.html',
  styleUrl: './editar-membresia-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarMembresiaPageComponent {
  private fb = inject(FormBuilder);
  private membresiaService = inject(MembresiaService);
  private router = inject(Router);
  private route = inject(ActivatedRoute); // ← inyectamos la ruta

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    duracion_dias: ['', Validators.required],
    duracion_custom: this.fb.control<number | null>(null),
    precio: [0, [Validators.required, Validators.min(0)]],
    descripcion: ['', Validators.required]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.membresiaService.obtenerMembresiaPorId(Number(id)).subscribe({

        next: (membresia) => {
          this.formulario.patchValue({
            nombre: membresia.nombre,
            duracion_dias: String(membresia.duracion_dias),
            precio: membresia.precio,
            descripcion: membresia.descripcion
          });

          // Si la duración no es predefinida, activamos el custom
          const esCustom = ![30, 60, 90].includes(membresia.duracion_dias);
          if (esCustom) {
            this.formulario.patchValue({
              duracion_dias: 'custom',
              duracion_custom: membresia.duracion_dias
            });
          }
        },
        error: (err) => {
          console.error('Error al obtener membresía:', err);
          this.router.navigate(['/membresias']);
        }
      });
    }

    // Validadores dinámicos
    this.formulario.get('duracion_dias')?.valueChanges.subscribe(valor => {
      const customControl = this.formulario.get('duracion_custom');
      if (valor === 'custom') {
        customControl?.setValidators([Validators.required, Validators.min(1)]);
      } else {
        customControl?.clearValidators();
        customControl?.setValue(null);
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

    const id = this.route.snapshot.paramMap.get('id');
    this.membresiaService.actualizarMembresia(Number(id), membresia).subscribe({
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
