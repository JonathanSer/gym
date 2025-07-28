<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MembresiaUsuario extends Model
{
    protected $table = 'membresia_usuario';

    protected $fillable = [
        'user_id',
        'membresia_id',
        'activa',
        'fecha_inicio',
        'fecha_expiracion',
    ];

    public function membresia(): BelongsTo
    {
        return $this->belongsTo(Membresia::class);
    }
}



