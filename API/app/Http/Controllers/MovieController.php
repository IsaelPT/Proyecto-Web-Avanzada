<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    //
    public function index(){
        try {
            return Movie::all();
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener la información de las películas.'], 500);
        }
    }

    public function show($id) {
        try {
            return Movie::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener la película.'], 500);
        }
    }

    public function store(Request $request){
        try {
            $validated = $request->validate([
                "title"=> "required|string|max:255",
                "year" => "required|integer|min:1950|max:2025",
                "genre" => "required|string|max:255",
            ]);
            $product = Movie::create($validated);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo crear la película.'], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $movie = Movie::findOrFail($id);
            $validated = $request->validate([
                "title"=> "sometimes|string|max:255",
                "year" => "sometimes|integer|min:1950|max:2025",
                "genre" => "sometimes|string|max:255",
            ]);
            $movie->update($validated);
            return response()->json($movie, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar la película.'], 500);
        }
    }

    public function destroy($id){
        try {
            $actor = Movie::findOrFail($id);
            $actor->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar la película.'], 500);
        }
    }
}
