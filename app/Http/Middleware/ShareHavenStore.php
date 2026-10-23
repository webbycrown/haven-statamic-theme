<?php

namespace App\Http\Middleware;

use App\Services\HavenStore;
use Closure;
use Illuminate\Http\Request;

class ShareHavenStore
{
    public function handle(Request $request, Closure $next)
    {
        app(HavenStore::class)->share();

        return $next($request);
    }
}
