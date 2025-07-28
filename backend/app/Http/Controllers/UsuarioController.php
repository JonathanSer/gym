<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

use Illuminate\Support\Facades\Hash;
use App\Models\MembresiaUsuario;
use App\Models\Membresia;

use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = User::with('membresiaActual.membresia')->get();

        return response()->json($usuarios);
    }

    public function show($id)
    {
        $usuario = User::with('membresiaActual.membresia')->find($id);

        if (!$usuario) {
            return response()->json([
                'error' => 'Usuario no encontrado'
            ], 404);
        }

        return response()->json(
            $usuario
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string',
            'correo' => 'required|email|unique:users,correo',
            'rol' => 'required|string',
            'contrasena' => 'required|string|min:6',
            'membresia.id' => 'nullable|exists:membresias,id',
        ]);

        DB::beginTransaction();

        try {
            // Crear usuario con contraseña hasheada
            $user = User::create([
                'nombre' => $data['nombre'],
                'correo' => $data['correo'],
                'rol' => $data['rol'],
                'contrasena' => Hash::make($data['contrasena']),
            ]);

            // Si envían membresia y existe
            if (isset($data['membresia']['id'])) {
                $membresia = Membresia::find($data['membresia']['id']);

                if ($membresia) {
                    MembresiaUsuario::create([
                        'user_id' => $user->id,
                        'membresia_id' => $membresia->id,
                        'activa' => true,
                        'fecha_inicio' => now(), // <---- Agregamos fecha_inicio
                        'fecha_expiracion' => now()->addDays($membresia->duracion_dias),
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'mensaje' => 'Usuario creado con membresía',
                'usuario' => $user->load('membresiaActual.membresia')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al crear usuario', 'detalle' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $data = $request->validate([
                'nombre' => 'required|string',
                'correo' => 'required|email|unique:users,correo,' . $id,
                'rol' => 'required|string|in:administrador,cliente,entrenador',
                'contrasena' => 'nullable|string|min:6',
                'membresia.id' => 'nullable|exists:membresias,id',
            ]);

            DB::beginTransaction();

            $user = User::findOrFail($id);

            $user->nombre = $data['nombre'];
            $user->correo = $data['correo'];
            $user->rol = $data['rol']; // Asegúrate de que esto sea válido

            if (!empty($data['contrasena'])) {
                $user->contrasena = Hash::make($data['contrasena']);
            }

            $user->save();

            /*
            // Verifica si el campo 'membresia' fue enviado en el request
            if ($request->has('membresia')) {
                // Si viene como null, desactivar membresía actual
                if (is_null($request->membresia)) {
                    MembresiaUsuario::where('user_id', $user->id)->update(['activa' => false]);
                }
                // Si viene con un ID válido, desactivar la actual y asignar la nueva
                elseif (isset($data['membresia']['id'])) {
                    $membresia = Membresia::find($data['membresia']['id']);

                    if ($membresia) {
                        MembresiaUsuario::where('user_id', $user->id)->update(['activa' => false]);

                        MembresiaUsuario::create([
                            'user_id' => $user->id,
                            'membresia_id' => $membresia->id,
                            'activa' => true,
                            'fecha_inicio' => now(),
                            'fecha_expiracion' => now()->addDays($membresia->duracion_dias),
                        ]);
                    }
                }
            }*/


            DB::commit();

            return response()->json([
                'mensaje' => 'Usuario actualizado',
                'usuario' => $user->load('membresiaActual.membresia')
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json([
                'error' => 'Error al actualizar usuario',
                'mensaje' => $e->getMessage(),
                'traza' => $e->getTraceAsString(),
                'datos_enviados' => $request->all(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $usuario = User::find($id);

            if (!$usuario) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }

            // Opcional: eliminar relaciones (por ejemplo membresías)
            MembresiaUsuario::where('user_id', $usuario->id)->delete();

            // Eliminar usuario
            $usuario->delete();

            return response()->json(['mensaje' => 'Usuario eliminado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar usuario', 'detalle' => $e->getMessage()], 500);
        }
    }

}
