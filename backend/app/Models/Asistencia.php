<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Asistencia extends Model
{
    protected $fillable = [
        'usuario_id',
        'usuario_membresia_id',
        'fecha_hora_entrada',
        'fecha_hora_salida'
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class);
    }

    public function membresia()
    {
        return $this->belongsTo(MembresiaUsuario::class, 'usuario_membresia_id');
    }
}
