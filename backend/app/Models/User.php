<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use App\Models\MembresiaUsuario;

class User extends Authenticatable implements JWTSubject
{
    protected $table = 'users';

    protected $fillable = [
        'nombre', 'correo', 'contrasena', 'rol'
    ];

    protected $hidden = ['contrasena'];

    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function membresiaActual()
    {
        return $this->hasOne(MembresiaUsuario::class)->where('activa', true);
    }

}
