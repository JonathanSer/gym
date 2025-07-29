export interface Asistencia {

  "id"?: number,
  "usuario_id": number,
  "usuario_membresia_id": number,
  "fecha_hora_entrada": string,
  "fecha_hora_salida"?: string | null
  "created_at"?: Date,
  "updated_at"?: Date

}
