<?php

use App\Http\Controllers\App\CompanyController;
use App\Http\Controllers\App\DashboardController;
use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});

Route::middleware(['auth', 'company'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', function () {});
});


Route::middleware(['auth'])->group(function () {
    Route::resource('company', CompanyController::class);
})->middleware('company.has');
