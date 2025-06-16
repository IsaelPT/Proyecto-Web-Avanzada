<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ImageCorsHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);
        // Solo para rutas que contienen /storage/
        if (strpos($request->getRequestUri(), '/storage/') !== false) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
            $response->headers->set('Cross-Origin-Resource-Policy', 'cross-origin');
        }
        return $response;
    }
}
