<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Membresia extends Model
{
    protected $fillable = ['nombre', 'duracion_dias', 'precio', 'descripcion'];

    public function usuarios()
    {
        return $this->belongsToMany(User::class, 'membresias_usuarios', 'membresia_id', 'usuario_id')
                    ->withPivot('fecha_inicio', 'fecha_fin', 'estado')
                    ->withTimestamps();
    }
}

