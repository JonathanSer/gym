import { Membresia } from "./membresia.interface";

export interface MembresiaActual {
    id?:               number;
    user_id?:          number;
    membresia_id?:     number;
    fecha_inicio?:     Date;
    fecha_expiracion?: Date;
    activa?:           number;
    created_at?:       Date;
    updated_at?:       Date;
}
