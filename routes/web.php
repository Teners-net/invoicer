<?php

use Auth0\Laravel\Facade\Auth0;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/private', function () {
  return response('Welcome! You are logged in.');
})->middleware('auth');

Route::get('/', function () {
  if (!auth()->check()) {
    return response('You are not logged in.');
  }

  $user = auth()->user();

  return Inertia::render('Welcome', [
    'user' => $user
  ]);
});

Route::get('/profile', function () {
  $user = auth()->user();
})->middleware('auth');