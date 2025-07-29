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
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('membresia_id')->constrained('membresias')->onDelete('cascade');
            $table->tinyInteger('activa')->default(1);
            $table->date('fecha_inicio')->nullable();
            $table->date('fecha_expiracion')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('membresias_usuarios');
    }
}
