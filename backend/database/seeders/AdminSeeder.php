<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'nombre' => 'Admin',
            'correo' => 'admin@gym.com',
            'contrasena' => Hash::make('Admin123.'),
            'rol' => 'administrador',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
