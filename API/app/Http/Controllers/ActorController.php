<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actor;

class ActorController extends Controller
{
    //
    public function index(){
        try {
            return Actor::all();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener la información de los actores.'], 500);
        }
    }

    public function show($id) {
        try {
            return Actor::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener el actor.'], 500);
        }
    }

    public function store(Request $request){
        try {
            $validated = $request->validate([
                "name"=> "sometimes|string|max:255",
                "age" => "sometimes|integer",
            ]);

            $product = Actor::create($validated);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo crear el actor.'], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $actor = Actor::findOrFail($id);
            $validated = $request->validate([
                "name"=> "required|string|max:255",
                "age" => "required|integer",
            ]);

            $actor->update($validated);
            return response()->json($actor, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar el actor.'], 500);
        }
    }

    public function destroy($id){
        try {
            $actor = Actor::findOrFail($id);
            $actor->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar el actor.'], 500);
        }
    }
}
