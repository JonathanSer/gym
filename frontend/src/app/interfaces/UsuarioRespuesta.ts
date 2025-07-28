export interface UsuarioRespuesta {
  mensaje: string;
  usuario: Usuario;
}

export interface Usuario {
  id:                   number;
  nombre:               string;
  correo:               string;
  correo_verificado_en: null;
  rol:                  string;
  remember_token:       null;
  created_at:           Date;
  updated_at:           Date;
  membresia_actual:     MembresiaActual;
}

export interface MembresiaActual {
  id:               number;
  user_id:          number;
  membresia_id:     number;
  fecha_inicio:     Date;
  fecha_expiracion: Date;
  activa:           number;
  created_at:       Date;
  updated_at:       Date;
  membresia:        Membresia;
}

export interface Membresia {
  id:            number;
  nombre:        string;
  duracion_dias: number;
  precio:        string;
  descripcion:   string;
  created_at:    Date;
  updated_at:    Date;
}


export interface Respuesta {
  id:                   number;
  nombre:               string;
  correo:               string;
  correo_verificado_en: null;
  rol:                  string;
  remember_token:       null;
  created_at:           Date;
  updated_at:           Date;
  membresia_actual:     MembresiaActual;
}

export interface MembresiaActual {
  id:               number;
  user_id:          number;
  membresia_id:     number;
  fecha_inicio:     Date;
  fecha_expiracion: Date;
  activa:           number;
  created_at:       Date;
  updated_at:       Date;
  membresia:        Membresia;
}

export interface Membresia {
  id:            number;
  nombre:        string;
  duracion_dias: number;
  precio:        string;
  descripcion:   string;
  created_at:    Date;
  updated_at:    Date;
}
