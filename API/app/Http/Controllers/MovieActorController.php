<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MoviesActor;

class MovieActorController extends Controller
{
    //
    public function index(){
        return MoviesActor::all();
    }

    public function show($id) {
        return MoviesActor::findOrFail($id);
    }

    public function store(Request $request){
        $validated = $request->validate([
            "movie_id"=> "required|integer",
            "actor_id" => "required|integer",
        ]);


        $product = MoviesActor::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id){
        $movieactor = MoviesActor::findOrFail($id);
        $validated = $request->validate([
            "movie_id"=> "required|integer",
            "actor_id" => "required|integer",
        ]);

        $movieactor->update($validated);
        return response()->json($movieactor, 200);
    }

    public function destroy($id){
        $actor = MoviesActor::findOrFail($id);
        $actor->delete();
        return response()->json(null, 204);
    }
}
