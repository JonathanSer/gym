<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use Illuminate\Http\Request;

class AsistenciaController extends Controller
{
    public function index()
    {
        return Asistencia::with(['usuario', 'membresia'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'usuario_membresia_id' => 'required|exists:membresia_usuario,id',
            'fecha_hora_entrada' => 'required|date',
            'fecha_hora_salida' => 'nullable|date|after_or_equal:fecha_hora_entrada',
        ]);

        $asistencia = Asistencia::create($request->all());

        return response()->json($asistencia, 201);
    }

    public function show($id)
    {
        $asistencia = Asistencia::with(['usuario', 'membresia'])->findOrFail($id);
        return response()->json($asistencia);
    }

    public function update(Request $request, $id)
    {
        $asistencia = Asistencia::findOrFail($id);

        $request->validate([
            'fecha_hora_salida' => 'nullable|date|after_or_equal:fecha_hora_entrada',
        ]);

        $asistencia->update($request->all());

        return response()->json($asistencia);
    }

    public function destroy($id)
    {
        $asistencia = Asistencia::findOrFail($id);
        $asistencia->delete();

        return response()->json(null, 204);
    }
}

