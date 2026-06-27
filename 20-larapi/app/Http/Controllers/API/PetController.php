<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pet;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

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
            Log::info('=== STORE REQUEST ===');
            
            $validated = $request->validate([
                'name' => ['required', 'string'],
                'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp,bmp', 'max:5120'],
                'kind' => ['required', 'string'],
                'weight' => ['required', 'numeric', 'min:0', 'max:200'],
                'age' => ['required', 'integer', 'min:0', 'max:360'],
                'breed' => ['nullable', 'string'],
                'location' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'active' => ['sometimes', 'boolean'],
                'adopted' => ['sometimes', 'boolean']
            ]);

            $data = $validated;

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                $file = $request->file('image');
                $imageName = $file->getClientOriginalName();
                
                $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($imageName, PATHINFO_FILENAME));
                $extension = $file->getClientOriginalExtension();
                $newImageName = $cleanName . '.' . $extension;
                
                $counter = 1;
                while (Storage::disk('public')->exists('pets/' . $newImageName)) {
                    $newImageName = $cleanName . '_' . $counter . '.' . $extension;
                    $counter++;
                }
                
                $file->storeAs('pets', $newImageName, 'public');
                $data['image'] = $newImageName;
                Log::info('✅ Image saved:', ['image' => $newImageName]);
            } else {
                Log::info('⚠️ No image uploaded');
                $data['image'] = 'no-image.png';
            }

            $pet = Pet::create($data);
            Log::info('✅ Pet created:', ['pet' => $pet]);

            return response()->json([
                'success' => true,
                'message' => 'Pet created successfully 🎉',
                'pet' => $pet
            ], 201);

        } catch (\Exception $e) {
            Log::error('❌ Error:', ['error' => $e->getMessage()]);
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id){
        try {
            Log::info('=== UPDATE REQUEST ===');
            Log::info('ID:', [$id]);
            
            $pet = Pet::find($id);

            if(!$pet){
                return response()->json([
                    'success' => false,
                    'message' => 'Pet not found!'
                ], 404);
            }

            $validated = $request->validate([
                'name' => ['sometimes', 'required', 'string'],
                'image' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg,webp,bmp', 'max:5120'],
                'kind' => ['sometimes', 'required', 'string'],
                'weight' => ['sometimes', 'required', 'numeric', 'min:0', 'max:200'],
                'age' => ['sometimes', 'required', 'integer', 'min:0', 'max:360'],
                'breed' => ['nullable', 'string'],
                'location' => ['nullable', 'string'],
                'description' => ['nullable', 'string'],
                'active' => ['sometimes', 'boolean'],
                'adopted' => ['sometimes', 'boolean']
            ]);

            $data = $validated;

            if ($request->hasFile('image') && $request->file('image')->isValid()) {
                if ($pet->image && $pet->image !== 'no-image.png') {
                    if (Storage::disk('public')->exists('pets/' . $pet->image)) {
                        Storage::disk('public')->delete('pets/' . $pet->image);
                        Log::info('🗑️ Old image deleted:', ['image' => $pet->image]);
                    }
                }
                
                $file = $request->file('image');
                $imageName = $file->getClientOriginalName();
                
                $cleanName = preg_replace('/[^a-zA-Z0-9_-]/', '_', pathinfo($imageName, PATHINFO_FILENAME));
                $extension = $file->getClientOriginalExtension();
                $newImageName = $cleanName . '.' . $extension;
                
                $counter = 1;
                while (Storage::disk('public')->exists('pets/' . $newImageName)) {
                    $newImageName = $cleanName . '_' . $counter . '.' . $extension;
                    $counter++;
                }
                
                $file->storeAs('pets', $newImageName, 'public');
                $data['image'] = $newImageName;
                Log::info('✅ New image saved:', ['image' => $newImageName]);
            }

            $pet->update($data);
            Log::info('✅ Pet updated:', ['pet' => $pet]);

            return response()->json([
                'success' => true,
                'message' => 'Pet updated successfully!',
                'pet' => $pet
            ], 200);

        } catch (\Exception $e) {
            Log::error('❌ Error:', ['error' => $e->getMessage()]);
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

            if ($pet->image && $pet->image !== 'no-image.png') {
                if (Storage::disk('public')->exists('pets/' . $pet->image)) {
                    Storage::disk('public')->delete('pets/' . $pet->image);
                    Log::info('🗑️ Image deleted:', ['image' => $pet->image]);
                }
            }

            $pet->delete();

            return response()->json([
                'success' => true,
                'message' => 'Pet deleted successfully!'
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong!',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}