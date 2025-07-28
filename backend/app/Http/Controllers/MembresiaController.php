<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Membresia;
use Illuminate\Http\Request;

class MembresiaController extends Controller
{
    public function index()
    {
        return Membresia::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'duracion_dias' => 'required|integer',
            'precio' => 'required|numeric',
            'descripcion' => 'nullable|string',
        ]);

        $membresia = Membresia::create($request->all());
        return response()->json($membresia, 201);
    }

    public function show(Membresia $membresia)
    {
        return $membresia;
    }

    public function update(Request $request, Membresia $membresia)
    {
        $request->validate([
            'nombre' => 'sometimes|string',
            'duracion_dias' => 'sometimes|integer',
            'precio' => 'sometimes|numeric',
            'descripcion' => 'nullable|string',
        ]);

        $membresia->update($request->all());
        return response()->json($membresia);
    }

    public function destroy(Membresia $membresia)
    {
        $membresia->delete();
        return response()->json(null, 204);
    }
}
