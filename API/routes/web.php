<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

// Middleware para imágenes en storage (solo para desarrollo con php artisan serve)
Route::get('/storage/{path}', function ($path) {
    $storagePath = storage_path('app/public/' . $path);
    if (!file_exists($storagePath)) {
        abort(404);
    }
    $mime = mime_content_type($storagePath);
    return response()->file($storagePath, [
        'Access-Control-Allow-Origin' => '*',
        'Cross-Origin-Resource-Policy' => 'cross-origin',
        'Content-Type' => $mime,
    ]);
})->where('path', '.*')->middleware('image.cors');
