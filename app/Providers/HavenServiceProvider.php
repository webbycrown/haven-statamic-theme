<?php

namespace App\Providers;

use App\Console\Commands\SetupIndustryCommand;
use App\Http\Controllers\CartController;
use App\Http\Middleware\ShareHavenStore;
use App\Services\HavenStore;
use App\Support\HavenSearch;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class HavenServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton(HavenStore::class);
    }

    public function boot(): void
    {
        if ($this->app->runningInConsole()) {
            $this->commands([SetupIndustryCommand::class]);
        }

        $this->app['router']->pushMiddlewareToGroup('web', ShareHavenStore::class);

        // Registered here so starter-kit install does not replace the site's routes/web.php.
        Route::middleware('web')->group(function () {
            Route::statamic('/search', 'search', ['title' => 'Search']);
            Route::statamic('/cart', 'cart', ['title' => 'View Cart']);
            Route::statamic('/checkout', 'checkout', ['title' => 'Checkout']);
            Route::statamic('/categories/{category_slug}', 'category');

            Route::post('/cart/add', [CartController::class, 'add'])->name('haven.cart.add');
            Route::post('/cart/update', [CartController::class, 'update'])->name('haven.cart.update');
            Route::post('/cart/remove', [CartController::class, 'remove'])->name('haven.cart.remove');
        });

        View::composer('*', function () {
            app(HavenStore::class)->share();
        });

        View::composer('search', function ($view) {
            $query = trim((string) request()->query('q', ''));
            $results = app(HavenSearch::class)->results($query);
            $view->with([
                'query' => $query,
                'results' => $results,
                'result_count' => count($results),
                'title' => 'Search',
            ]);
        });
    }
}
