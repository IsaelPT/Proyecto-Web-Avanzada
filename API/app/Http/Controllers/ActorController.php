<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actor;

class ActorController extends Controller
{
    //
    public function index(){
        return Actor::all();
    }

    public function show($id) {
        return Actor::findOrFail($id);
    }

    public function store(Request $request){
        $validated = $request->validate([
            "name"=> "sometimes|string|max:255",
            "age" => "sometimes|integer",
        ]);

        $product = Actor::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id){
        $actor = Actor::findOrFail($id);
        $validated = $request->validate([
            "name"=> "required|string|max:255",
            "age" => "required|integer",
        ]);

        $actor->update($validated);
        return response()->json($actor, 200);
    }

    public function destroy($id){
        $actor = Actor::findOrFail($id);
        $actor->delete();
        return response()->json(null, 204);
    }
}
