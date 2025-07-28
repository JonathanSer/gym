import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Membresia } from '../../../interfaces/membresia.interface';
import { MembresiaService } from '../../../services/membresia.service';
import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioMembresia } from '../../../interfaces/usuario-membresia.interface';
import { MembresiaUsuario } from '../../../interfaces/membresia-usuario';
import { UsuarioActualizado } from '../../../interfaces/usuario-actualizado.interface';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private membresiaService = inject(MembresiaService);
  private usuarioService = inject(UsuarioService);

  mostrarInfo = false;
  membresiaSeleccionada: Membresia | null = null;
  mostrarContrasena = false;
  mostrarConfirmar = false;
  membresias: Membresia[] = [];
  usuarioOriginal: UsuarioMembresia | null = null;

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    rol: ['', Validators.required],
    membresia: [''],
    contrasena: ['', [Validators.minLength(8)]],
    confirmarContrasena: ['']
  }, { validators: this.validarCoincidenciaContrasena });

  ngOnInit(): void {

    this.membresiaService.obtenerMembresias().subscribe(data => {
      this.membresias = data;
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.usuarioService.obtenerUsuarioPorId(+id).subscribe({
        next: (usuario: MembresiaUsuario) => {
          this.formulario.patchValue({
            nombre: usuario.nombre,
            correo: usuario.correo,
            rol: usuario.rol,
            membresia: usuario.membresia_actual?.membresia.id ? String(usuario.membresia_actual?.membresia.id) : '',
            contrasena: usuario.contrasena,
            confirmarContrasena: usuario.contrasena
          });
          this.formulario.get('correo')?.disable();
        },
        error: (err) => {
          console.error('Error al obtener usuario:', err);
        }
      });
    }

    this.formulario.get('membresia')?.valueChanges.subscribe(() => {
      this.mostrarInfoMembresia();
    });
  }

  validarCoincidenciaContrasena(group: AbstractControl) {
    const pass = group.get('contrasena')?.value;
    const confirm = group.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { contrasenaNoCoincide: true };
  }

  guardarCambios() {
    const id = this.route.snapshot.paramMap.get('id');

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const formValue = this.formulario.getRawValue();
    const membresiaSeleccionada = this.membresias.find(
      m => m.id === +formValue.membresia!
    );

    const contrasenaFinal = formValue.contrasena?.trim()
      ? formValue.contrasena
      : null;

    const usuarioActualizado: UsuarioActualizado = {
      nombre: formValue.nombre!,
      correo: this.usuarioOriginal?.correo! ?? formValue.correo,
      rol: formValue.rol!,
      contrasena: contrasenaFinal,
      membresia: membresiaSeleccionada
        ? {
            id: membresiaSeleccionada.id!
          }
        : null
    };

    if (usuarioActualizado.contrasena === null || usuarioActualizado.contrasena.length > 8) {
      console.log(usuarioActualizado)

      this.usuarioService.actualizarUsuario(+id!, usuarioActualizado).subscribe(() => {
        console.log(usuarioActualizado)
        this.router.navigate(['/usuarios']);
      });
    }
  }

  limpiarFormulario() {
    if (!this.usuarioOriginal) return;
    this.formulario.patchValue({
      nombre: this.usuarioOriginal.nombre,
      correo: this.usuarioOriginal.correo,
      rol: this.usuarioOriginal.rol,
      membresia: String(this.usuarioOriginal.membresia_actual?.id) ?? '',
      contrasena: '',
      confirmarContrasena: ''
    });
    this.formulario.get('correo')?.disable();
    this.mostrarInfo = false;
  }

  mostrarInfoMembresia() {
    const seleccion = this.formulario.get('membresia')?.value;
    this.membresiaSeleccionada = this.membresias.find(m => m.id === +seleccion!) ?? null;
    this.mostrarInfo = !!this.membresiaSeleccionada;
  }

  cancelarEdicion() {
    this.router.navigate(['/usuarios']);
  }

  togglePassword() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  toggleConfirmar() {
    this.mostrarConfirmar = !this.mostrarConfirmar;
  }

  esCliente(): boolean {
    return this.formulario.value.rol === 'cliente'
  }

}
