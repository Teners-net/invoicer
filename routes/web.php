<?php

use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
  return Inertia::render('Welcome');
});

Route::middleware('auth')->group(function () {

  Route::get('/dashboard', function () {
    $user = auth()->user();

    return Inertia::render('App/Dashboard', [
      'user' => $user
    ]);
  })->name('dashboard');

  Route::get('/profile', function () {
    $user = auth()->user();
  });
});
