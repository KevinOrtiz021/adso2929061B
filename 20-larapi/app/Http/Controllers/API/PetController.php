<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;
use Illuminate\Database\QueryException;
use Exception;

class PetController extends Controller
{
    public function index(){
        $pets = Pet::all();
        return response()->json([
            'message' => 'Query success!',
            'pets' => $pets,
        ], 200);
    }

    public function show($id){
        $pet = Pet::find($id);

        if(!$pet){
            return response()->json([
                'message' => 'Pet not found!'
            ], 404);
        }

        return response()->json([
            'message' => 'Query success!',
            'pet' => $pet
        ], 200);
    }

    public function store(Request $request) {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string'],
                'image' => ['nullable', 'string'],
                'kind' => ['required', 'string'],
                'weight' => ['required', 'numeric', 'min:0', 'max:200'],
                'age' => ['required', 'integer', 'min:0', 'max:360'],
                'bread' => ['nullable', 'string'],
                'location' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'active' => ['sometimes', 'boolean'],
                'adopted' => ['sometimes', 'boolean']
            ]);

            $pet = Pet::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Pet created successfully 🎉',
                'pet' => $pet
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422);

        } catch (QueryException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Database error!',
                'error' => 'Could not save pet to database'
            ], 500);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            $pet = Pet::find($id);

            if(!$pet){
                return response()->json([
                    'success' => false,
                    'message' => 'Pet not found!'
                ], 404);
            }

            $validated = $request->validate([
                'name' => ['sometimes', 'required', 'string'],
                'image' => ['nullable', 'string'],
                'kind' => ['sometimes', 'required', 'string'],
                'weight' => ['sometimes', 'required', 'numeric', 'min:0', 'max:200'],
                'age' => ['sometimes', 'required', 'integer', 'min:0', 'max:360'],
                'bread' => ['nullable', 'string'],
                'location' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'active' => ['sometimes', 'boolean'],
                'adopted' => ['sometimes', 'boolean']
            ]);

            $pet->update($validated);

            return response()->json([
                'success' => true,
                'message' => 'Pet updated successfully!',
                'pet' => $pet
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error!',
                'errors' => $e->errors()
            ], 422);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id){
        try {
            $pet = Pet::find($id);

            if(!$pet){
                return response()->json([
                    'success' => false,
                    'message' => 'Pet not found!'
                ], 404);
            }

            $pet->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pet deleted successfully!'
            ], 200);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
