import { MembresiaUsuario } from "./membresia-usuario";
import { Membresia } from "./membresia.interface";
import { Usuario } from "./usuario.interface";

export interface UsuarioMembresia extends Usuario {
  "contrasena"?: string
  "membresia_actual"?: null | Membresia | MembresiaUsuario
}
