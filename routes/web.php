<?php

use App\Http\Controllers\App\CompanyController;
use App\Http\Controllers\App\CustomerController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\InvoiceController;
use App\Http\Controllers\App\ProductController;
use App\Http\Controllers\Platform\SubscriptionController;
use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::resource('pricing', SubscriptionController::class);

Route::middleware(['auth', 'company'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('products', ProductController::class);
    Route::resource('customers', CustomerController::class);

    Route::controller(InvoiceController::class)->prefix('invoices')->group(function () {
        Route::get('{invoice}/setup', 'setup')->name('invoices.setup');
        Route::patch('{invoice}/setup', 'setupUpdate')->name('invoices.setup');
    });
    Route::resource('invoices', InvoiceController::class);

    Route::get('profile', function () {
    });
});

Route::middleware(['auth'])->group(function () {
    Route::resource('company', CompanyController::class)->middleware('company.has');
});
