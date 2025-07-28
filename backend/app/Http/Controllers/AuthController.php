<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validar entrada
        $request->validate([
            'correo' => 'required|email',
            'contrasena' => 'required|string',
        ]);

        $credenciales = [
            'correo' => $request->correo,
            'password' => $request->contrasena, // clave 'password' pero valor 'contrasena'
        ];

        if (! $token = JWTAuth::attempt($credenciales)) {
            return response()->json(['error' => 'Credenciales inválidas'], 401);
        }

        return response()->json([
            'usuario' => JWTAuth::user(),
            'token' => $token,
        ]);
    }

    public function me()
    {
        return response()->json(JWTAuth::user());
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['mensaje' => 'Sesión cerrada correctamente']);
    }

    public function refresh()
    {
        $token = JWTAuth::refresh(JWTAuth::getToken());
        return response()->json(['token' => $token]);
    }

}

