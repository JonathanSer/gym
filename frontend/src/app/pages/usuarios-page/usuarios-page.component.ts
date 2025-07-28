import { Component, inject, OnInit } from '@angular/core';
import { TablaComponent } from "../../components/tabla/tabla.component";
import { UsuarioService } from '../../services/usuario.service';
import { EncabezadoComponent } from "../../components/encabezado/encabezado.component";
import { Router } from '@angular/router';
import { Usuario } from '../../interfaces/UsuarioRespuesta';

@Component({
  selector: 'app-usuarios-page',
  imports: [TablaComponent, EncabezadoComponent],
  templateUrl: './usuarios-page.component.html',
  styleUrl: './usuarios-page.component.css',
})
export class UsuariosPageComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private router = inject(Router)

  usuarios: Usuario[] = [];

  columnas = [
    { header: 'Nombre', field: 'nombre', type: '' },
    { header: 'Correo', field: 'correo', type: '' },
    { header: 'Rol', field: 'rol', type: 'texto' },
    { header: 'Fecha de registro', field: 'created_at', type: 'fecha' },
    { header: 'Hora de registro', field: 'created_at', type: 'hora' },
    //{ header: 'Membresia', field: 'membresia_actual.membresia.nombre', type: 'texto' },
  ];


  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  nuevoUsuario(){
    this.router.navigate(['/usuarios/crear'])
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}

