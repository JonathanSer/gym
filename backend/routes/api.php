<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MembresiaController;
use App\Http\Controllers\MembresiaUsuarioController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\AsistenciaController;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

Route::apiResource('membresias', MembresiaController::class);

Route::apiResource('membresias-usuarios', MembresiaUsuarioController::class);

Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);

Route::apiResource('asistencias', AsistenciaController::class);

