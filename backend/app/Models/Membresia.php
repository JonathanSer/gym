<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Membresia extends Model
{
    protected $fillable = ['nombre', 'duracion_dias', 'precio', 'descripcion'];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'membresia_usuario', 'membresia_id', 'user_id')
                    ->withPivot('fecha_inicio', 'fecha_expiracion', 'activa')
                    ->withTimestamps();
    }
}

