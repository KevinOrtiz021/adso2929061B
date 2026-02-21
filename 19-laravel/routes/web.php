<?php

use Illuminate\Support\Facades\Route;
use App\Models\User;
use App\Models\Pet;
use Carbon\Carbon;

Route::get('/', function () {
    return view('welcome');
});
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
Route::get('/challenge', function () {
    $users = User::take(20)->get();
    
    $output = "<style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        h2 { color: #333; }
        table { border-collapse: collapse; width: 100%; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        th { background: #4CAF50; color: white; padding: 12px; text-align: left; }
        td { padding: 10px; border: 1px solid #ddd; }
        tr:nth-child(even) { background: #f9f9f9; }
    </style>";
    
    $output .= "<h2>Users Challenge</h2>";
    $output .= "<table>";
    $output .= "<tr><th>Fullname</th><th>Age</th><th>Created</th></tr>";
    
    foreach ($users as $user) {
        $birthdate = Carbon::parse($user->birthdate);
        $age = $birthdate->age;
        
        $createdAt = Carbon::parse($user->created_at);
        $timeAgo = $createdAt->diffForHumans();
        
        $output .= "<tr>";
        $output .= "<td>" . $user->fullname . "</td>";
        $output .= "<td>" . $age . " years old</td>";
        $output .= "<td>created " . $timeAgo . "</td>";
        $output .= "</tr>";
    }
    
    $output .= "</table>";
    
    
    return $output;
});