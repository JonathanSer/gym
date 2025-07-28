import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { Usuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { DatePipe, I18nSelectPipe } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  imports: [FormsModule, ReactiveFormsModule, DatePipe, I18nSelectPipe],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css',
})
export class PerfilUsuarioComponent {

  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  usuario = signal<Usuario | null>(null);
  mostrarContrasena = false;

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

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    rol: [{ value: '', disabled: true }, Validators.required],
    contrasena: ['', [Validators.minLength(8)]]
  })

  ngOnInit(): void {
    this.authService.me().subscribe((usuario: Usuario) => {
      this.usuario.set(usuario);

      const id = usuario.id
      if(id){
        this.formulario.patchValue({
          nombre: usuario.nombre,
          correo: usuario.correo,
          rol: usuario.rol
        })
      }
    })
  }

  guardarPerfil(){}

  limpiarFormulario() {
    if (!this.usuario()) return;
    this.formulario.patchValue({
      nombre: this.usuario()!.nombre,
      correo: this.usuario()!.correo,
      rol: this.usuario()!.rol,
      contrasena: '',
    });
  }

  cancelarEdicion() {
    this.router.navigate(['/usuarios']);
  }

  togglePassword() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  miembroDesde(): string {
    return this.usuario()?.created_at!
  }

}
