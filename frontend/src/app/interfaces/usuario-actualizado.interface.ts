export interface UsuarioActualizado {
  nombre: string,
  correo: string,
  rol: string,
  contrasena: string | null,
  membresia: {
    id: number
  } | null
}
