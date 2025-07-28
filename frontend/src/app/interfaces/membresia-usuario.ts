import { MembresiaActual } from './UsuarioRespuesta';
import { Usuario } from './usuario.interface';

export interface MembresiaUsuario extends Usuario {

  "contrasena": string
  "membresia_actual"?: null | MembresiaActual

}
