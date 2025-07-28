<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CrearMembresias extends Migration
{
    public function up()
    {
        Schema::create('membresias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('duracion_dias');
            $table->decimal('precio', 8, 2);
            $table->text('descripcion')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('membresias');
    }
}
