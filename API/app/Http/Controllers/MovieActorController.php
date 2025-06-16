<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MoviesActor;
use Illuminate\Support\Facades\DB;

class MovieActorController extends Controller
{
    //
    public function index(){
        try {
            $results = DB::table('movies_actors')
                ->join('movies', 'movies_actors.movie_id', '=', 'movies.id')
                ->join('actors', 'movies_actors.actor_id', '=', 'actors.id')
                ->select(
                    'movies_actors.id',
                    'movies.title as movie_title',
                    'movies.genre as movie_genre',
                    'actors.name as actor_name',
                    'actors.age as actor_age'
                )
                ->get();
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener la información.'], 500);
        }
    }

    public function show($id) {
        try {
            return MoviesActor::findOrFail($id);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo obtener la relación.'], 500);
        }
    }

    public function store(Request $request){
        try {
            $validated = $request->validate([
                "movie_id"=> "required|integer",
                "actor_id" => "required|integer",
            ]);
            $product = MoviesActor::create($validated);
            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo crear la relación.'], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $movieactor = MoviesActor::findOrFail($id);
            $validated = $request->validate([
                "movie_id"=> "required|integer",
                "actor_id" => "required|integer",
            ]);
            $movieactor->update($validated);
            return response()->json($movieactor, 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo actualizar la relación.'], 500);
        }
    }

    public function destroy($id){
        try {
            $actor = MoviesActor::findOrFail($id);
            $actor->delete();
            return response()->json(null, 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo eliminar la relación.'], 500);
        }
    }

    public function filter($theme){
        try {
            $results = DB::table('movies_actors')
                ->join('movies', 'movies_actors.movie_id', '=', 'movies.id')
                ->join('actors', 'movies_actors.actor_id', '=', 'actors.id')
                ->where(function($query) use ($theme) {
                    $query->where('movies.title', 'like', "%$theme%")
                        ->orWhere('actors.name', 'like', "%$theme%")
                        ->orWhere('movies.genre', 'like', "%$theme%");
                })
                ->select(
                    'movies_actors.id',
                    'movies.title as movie_title',
                    'movies.genre as movie_genre',
                    'actors.name as actor_name',
                    'actors.age as actor_age'
                )
                ->get();
            return response()->json($results);
        } catch (\Exception $e) {
            return response()->json(['error' => 'No se pudo filtrar la información.'], 500);
        }
    }
}
