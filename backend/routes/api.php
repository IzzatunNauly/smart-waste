<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RubbishController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\TrashController;
use App\Http\Controllers\Api\TrashFullController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // settings
    Route::controller(SettingController::class)->group(function(){
        Route::prefix('settings')->group(function(){
            Route::get('profile/{user_id}', 'show_profile');
            Route::put('profile/{user_id}', 'update_profile');
            Route::put('password/{user_id}', 'update_password');
        });
    });

    // rubbish
    Route::apiResource('rubbish', RubbishController::class);
    Route::get('/percentage/rubbish', [RubbishController::class, 'percentage']);

    // trash
    Route::get('/trash', [TrashController::class, 'index']);
    Route::post('/trash', [TrashController::class, 'store']);
    Route::delete('/trash/{rubbish_id}', [TrashController::class, 'emptyrubbish']);

    // trashfull
    Route::get('/trashfull', [TrashFullController::class, 'index']);
});
