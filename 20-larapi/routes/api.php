<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PetController;
use App\Http\Controllers\API\AuthController;

// Login (público)
Route::post('/login', [AuthController::class, 'login']);

// Logout
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth.token');

// Rutas protegidas
Route::middleware(['auth.token'])->group(function () {
    Route::get('pets/list', [PetController::class, 'index']);
    Route::get('pets/show/{id}', [PetController::class, 'show']);
    Route::post('pets/store', [PetController::class, 'store']);
    Route::post('pets/edit/{id}', [PetController::class, 'update']);
    Route::delete('pets/delete/{id}', [PetController::class, 'destroy']);
});