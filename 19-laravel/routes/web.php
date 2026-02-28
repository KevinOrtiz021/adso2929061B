<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;use App\Models\User;
use App\Models\Pet;
use Carbon\Carbon;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
Route::get('hello', function () {
    return "<h1>Hello Laravel 🚀</h1>";
});

Route::get('sayhello/{name}', function () {
    return "<h1>Hello: ".request()->name."</h1>";
});

Route::get('getall/pets', function(){
    $pets = App\Models\Pet::all();
    dd($pets->toArray());
});

Route::get('show/pet/{id}', function(){
    $pet = App\Models\Pet::find(request()->id);
    dd($pet->toArray());
});
Route::get('challenge', function () {
    if (!file_exists(public_path('images'))) {
        mkdir(public_path('images'), 0777, true);
    }

    if (User::count() < 20) {
        User::factory()->count(20)->create();
    }

    $users = User::take(20)->get();

    foreach ($users as $user) {
        $imagePath = public_path('images/' . $user->photo);
        if (!file_exists($imagePath)) {
            try {
                $gender = ($user->gender == 'Male') ? 'men' : 'women';
                $url = "https://randomuser.me/api/portraits/{$gender}/" . rand(1,99) . ".png";
                file_put_contents($imagePath, file_get_contents($url));
            } catch (\Exception $e) {
            }
        }
    }

    $headerStyle = "style='background: gray; color: white; padding: 0.4rem; border: 1px solid gray;'";
    $cellStyle = "style='border: 1px solid gray; padding: 0.4rem;'";

    $code = "<h2>Challenge</h2>";
    $code .= "<table style='border-collapse: collapse; margin: 2px auto; font-family: Arial; border: 1px solid gray; width: 100%;'>";

    $code .= "<tr>";
    $code .= "<th $headerStyle>Photo</th>";
    $code .= "<th $headerStyle>Fullname</th>";
    $code .= "<th $headerStyle>Age</th>";
    $code .= "<th $headerStyle>Gender</th>";
    $code .= "<th $headerStyle>Created At</th>";
    $code .= "</tr>";

    foreach ($users as $user) {
        $age = Carbon::parse($user->birthdate)->age;

        $code .= "<tr>";

        $code .= "<td $cellStyle>";
        if (file_exists(public_path('images/' . $user->photo))) {
            $code .= "<img src='" . asset('images/' . $user->photo) . "' width='60' height='60' style='display: block; margin: 0 auto;'>";
        }
        $code .= "</td>";

        $code .= "<td $cellStyle>" . $user->fullname . "</td>";
        $code .= "<td $cellStyle>" . $age . " años</td>";
        $code .= "<td $cellStyle>" . $user->gender . "</td>";
        $code .= "<td $cellStyle>" . $user->created_at . "</td>";
        $code .= "</tr>";
    }

    $code .= "</table>";

    return $code;
});

Route::get('getall/pets', function(){
    $pets = App\Models\Pet::all();
    return view('getallpets')->with('pets', $pets);
});
Route::get('show/pet/{id}', function($id){
    $pet = Pet::findOrFail($id);
    return view('showpet')->with('pet', $pet);
});
