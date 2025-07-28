<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearMembresiasUsuarios extends Migration
{
    public function up()
    {
        Schema::create('membresias_usuarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usuario_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('membresia_id')->constrained('membresias')->onDelete('cascade');
            $table->date('fecha_inicio');
            $table->date('fecha_fin');
            $table->enum('estado', ['activo', 'vencido', 'cancelado'])->default('activo');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('membresias_usuarios');
    }
}
