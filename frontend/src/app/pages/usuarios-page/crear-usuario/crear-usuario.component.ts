import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Membresia } from '../../../interfaces/membresia.interface';
import { MembresiaService } from '../../../services/membresia.service';
import { UsuarioMembresia } from '../../../interfaces/usuario-membresia.interface';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css',
})
export class CrearUsuarioComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private membresiaService = inject(MembresiaService);
  private usuarioService = inject(UsuarioService);

  formulario!: FormGroup;
  mostrarInfo = false;
  membresiaSeleccionada: Membresia | null = null;

  mostrarContrasena = false;
  mostrarConfirmar = false;

  membresias: Membresia[] = [];

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      membresia: [''],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.validarCoincidenciaContrasena });

    this.membresiaService.obtenerMembresias().subscribe(data => {
      this.membresias = data;
    })

    this.formulario.get('membresia')?.valueChanges.subscribe(() => {
      this.mostrarInfoMembresia();
    });
  }

  validarCoincidenciaContrasena(group: AbstractControl) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { contrasenaNoCoincide: true };
  }

  crearUsuario() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formulario = this.formulario.value;

    // Buscar la membresía seleccionada en la lista
    const membresiaSeleccionada = this.membresias.find(
      m => m.id === +formulario.membresia // Asegúrate de convertir a número si viene como string
    );

    const nuevoUsuario: UsuarioMembresia = {
      nombre: formulario.nombre,
      correo: formulario.correo,
      rol: formulario.rol,
      contrasena: formulario.contrasena,
      membresia_actual: membresiaSeleccionada
        ? {
            id: membresiaSeleccionada.id,
            nombre: membresiaSeleccionada.nombre,
            precio: membresiaSeleccionada.precio,
            duracion_dias: membresiaSeleccionada.duracion_dias
          }
        : null
    };

    this.usuarioService.crearUsuario(nuevoUsuario).subscribe(() => {
      console.log('Usuario Guardado')
    });

    this.router.navigate(['/usuarios']);
  }


  limpiarFormulario() {
    this.formulario.reset({
      nombre: '',
      correo: '',
      rol: '',
      membresia: '',  // explícito para resetear como cadena vacía
      contrasena: '',
      confirmarContrasena: ''
    });
    this.mostrarInfo = false;
    this.membresiaSeleccionada = null;
    this.mostrarContrasena = false;
    this.mostrarConfirmar = false;
  }

  cancelarCreacion() {
    this.router.navigate(['/usuarios']);
  }

  togglePassword() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleConfirmar() {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  mostrarInfoMembresia() {
    const seleccion = this.formulario.get('membresia')?.value;
    this.membresiaSeleccionada = this.membresias.find(m => m.id === +seleccion!) ?? null;
    this.mostrarInfo = !!this.membresiaSeleccionada;
  }

  esCliente(): boolean {
    return this.formulario.value.rol === 'cliente'
  }

}
