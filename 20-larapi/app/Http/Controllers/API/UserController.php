<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index(){
        $users = User::all();
        return response()->json([
            'message' => 'Query success!',
            'users' => $users,
        ], 200);
    }
    
    public function show($id){
        $user = User::find($id);
        
        if(!$user){
            return response()->json([
                'message' => 'User not found!'
            ], 404);
        }
        
        return response()->json([
            'message' => 'Query success!',
            'user' => $user
        ], 200);
    }
    
    public function store(Request $request){
        try{
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6'
            ]);
            
            $validated['password'] = Hash::make($validated['password']);
            $user = User::create($validated);
            
            return response()->json([
                'message' => 'User created successfully!',
                'user' => $user
            ], 201);
            
        } catch(\Illuminate\Validation\ValidationException $e){
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422);
        }
    }

    public function update(Request $request, $id){
        $user = User::find($id);
        
        if(!$user){
            return response()->json([
                'message' => 'User not found!'
            ], 404);
        }
        
        try{
            $validated = $request->validate([
                'name' => 'sometimes|string|max:255',
                'email' => 'sometimes|email|unique:users,email,' . $id,
                'password' => 'sometimes|string|min:6'
            ]);
            
            if(isset($validated['password'])){
                $validated['password'] = Hash::make($validated['password']);
            }
            
            $user->update($validated);
            
            return response()->json([
                'message' => 'User updated successfully!',
                'user' => $user
            ], 200);
            
        } catch(\Illuminate\Validation\ValidationException $e){
            return response()->json([
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422);
        }
    }
    
    public function destroy($id){
        $user = User::find($id);
        
        if(!$user){
            return response()->json([
                'message' => 'User not found!'
            ], 404);
        }
        
        $user->delete();
        
        return response()->json([
            'message' => 'User deleted successfully!'
        ], 200);
    }
}