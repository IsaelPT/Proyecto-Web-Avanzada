<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieActorController;

Route::get('actors', [ActorController::class,'index']);
Route::get('actors/{id}',[ActorController::class,'show']);
Route::post('actors',[ActorController::class,'store']);
Route::put('actors/{id}',[ActorController::class,'update']);
Route::delete('actors/{id}',[ActorController::class,'destroy']);

Route::get('movies', [MovieController::class,'index']);
Route::get('movies/{id}',[MovieController::class,'show']);
Route::post('movies',[MovieController::class,'store']);
Route::put('movies/{id}',[MovieController::class,'update']);
Route::delete('movies/{id}',[MovieController::class,'destroy']);

Route::get('movies_actors', [MovieActorController::class,'index']);
Route::get('movies_actors/{id}',[MovieActorController::class,'show']);
Route::post('movies_actors',[MovieActorController::class,'store']);
Route::put('movies_actors/{id}',[MovieActorController::class,'update']);
Route::delete('movies_actors/{id}',[MovieActorController::class,'destroy']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
