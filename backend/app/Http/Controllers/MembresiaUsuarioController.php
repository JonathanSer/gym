<?php

namespace App\Http\Controllers;

use App\Models\Membresia;
use App\Models\MembresiaUsuario;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MembresiaUsuarioController extends Controller {
    public function index()
    {
        $membresia_usuario = MembresiaUsuario::all();

        return response()->json($membresia_usuario);
    }

    public function show($id)
    {
        $membresia_usuario = MembresiaUsuario::all()->find($id);

        if (!$membresia_usuario) {
            return response()->json([
                'error' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json(
            $membresia_usuario
        );
    }

    public function store(Request $request)
    {
        try {
            // Validar datos recibidos
            $validatedData = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'membresia_id' => 'required|integer|exists:membresias,id',
                'activa' => 'required|integer|in:0,1,2,3',
                'fecha_inicio' => 'nullable|date',
                'fecha_expiracion' => 'nullable|date|after_or_equal:fecha_inicio',
            ]);

            // Obtener membresías del usuario ordenadas por prioridad (activa delante)
            $membresiasUsuario = MembresiaUsuario::where('user_id', $validatedData['user_id'])
                                        ->orderByRaw("FIELD(activa, 1, 3, 2, 0)") // prioridad: 1,3,2,0
                                        ->get();

            $membresia = Membresia::find($validatedData['membresia_id']);

            if ($validatedData['activa'] === 1) {
                $yaExiste1 = $membresiasUsuario->firstWhere('activa', 1);
                $duracion = $membresia->duracion_dias ?? 0;
                if ($yaExiste1) {
                    $yaExiste2 = $membresiasUsuario->firstWhere('activa', 2);
                    $yaExiste3 = $membresiasUsuario->firstWhere('activa', 3);
                    if(!$yaExiste2 && !$yaExiste3){
                        $fechaExpiracion = $yaExiste1->fecha_expiracion;

                        $validatedData['activa'] = 3;
                        $validatedData['fecha_inicio'] = Carbon::parse($fechaExpiracion)->addDay();
                        $validatedData['fecha_expiracion'] = Carbon::parse($validatedData['fecha_inicio'])->addDays($duracion);

                        $nuevaMembresia = MembresiaUsuario::create($validatedData);
                        return response()->json($nuevaMembresia, 201);
                    } else {
                        return response()->json('Ya existe una siguiente', 201);
                    }
                } else {
                    $validatedData['activa'] = 1;
                    $validatedData['fecha_inicio'] = now();
                    $validatedData['fecha_expiracion'] = Carbon::parse($validatedData['fecha_inicio'])->addDays($duracion);

                    $nuevaMembresia = MembresiaUsuario::create($validatedData);
                    return response()->json($nuevaMembresia, 201);
                }
            } else {
                $yaExiste2 = $membresiasUsuario->firstWhere('activa', 2);
                $yaExiste3 = $membresiasUsuario->firstWhere('activa', 3);
                if(!$yaExiste2 && !$yaExiste3){
                    $validatedData['activa'] = 2;
                    $validatedData['fecha_inicio'] = null;
                    $validatedData['fecha_expiracion'] = null;
                    $nuevaMembresia = MembresiaUsuario::create($validatedData);
                    return response()->json($nuevaMembresia, 201);
                } else {
                    return response()->json('Ya tienes una membresia posterior', 201);
                }
            }

            // Crear la nueva membresía
            //$nuevaMembresia = MembresiaUsuario::create($validatedData);

            // Responder con el objeto creado y código 201
            return response()->json('Algo salio mal', 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Error de validación
            return response()->json([
                'error' => 'Error de validación',
                'messages' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            // Otros errores (BD, lógica, etc)
            return response()->json([
                'error' => 'Error al crear la membresía',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $relacion = MembresiaUsuario::find($id);

            if (!$relacion) {
                return response()->json(['error' => 'Relacion usuario membresia no encontrada'], 404);
            }

            // Eliminar usuario
            $relacion->delete();

            return response()->json(['mensaje' => 'Relacion usuario membresia eliminada correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la relacion usuario membresia', 'detalle' => $e->getMessage()], 500);
        }
    }


}
