<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        // Permitir solo desde localhost:3000
        $allowedOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
        $origin = $request->header('Origin');
        
        if (in_array($origin, $allowedOrigins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, X-CSRF-TOKEN');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Max-Age: 86400');
        }

        // Manejar solicitudes OPTIONS (preflight)
        if ($request->getMethod() == "OPTIONS") {
            return response('', 200);
        }

        return $next($request);
    }
}