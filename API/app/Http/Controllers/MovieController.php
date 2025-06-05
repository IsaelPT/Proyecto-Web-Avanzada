<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie;

class MovieController extends Controller
{
    //
    public function index(){
        return Movie::all();
    }

    public function show($id) {
        return Movie::findOrFail($id);
    }

    public function store(Request $request){
        $validated = $request->validate([
            "title"=> "required|string|max:255",
            "year" => "required|integer|min:1950|max:2025",
            "genre" => "required|string|max:255",
        ]);

        $product = Movie::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id){
        $movie = Movie::findOrFail($id);
        $validated = $request->validate([
            "title"=> "sometimes|string|max:255",
            "year" => "sometimes|integer|min:1950|max:2025",
            "genre" => "sometimes|string|max:255",
        ]);

        $movie->update($validated);
        return response()->json($movie, 200);
    }

    public function destroy($id){
        $actor = Movie::findOrFail($id);
        $actor->delete();
        return response()->json(null, 204);
    }
}
