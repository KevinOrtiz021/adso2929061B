<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

use Maatwebsite\Excel\Facades\Excel;
use App\Exports\UsersExport;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $Pets = Pet::all();
        $pets = Pet::orderBy('id', 'desc')->paginate(12);
        return view('pets.index')->with('pets', $pets);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('pets.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $request->validate([

            'name' => ['required', 'string', 'unique:' . Pet::class],
            'images'=> ['required', 'image'],
            'kind'=>['required','string'],
            'weigth'=>['required','numeric'],
            'age'=>['required','numeric',],
            'breed'=>['required','string'],
            'location'=>['required','string'],
            'description'=>['required','string'],
            'active' => ['required'],
            'adopted' => ['required'],
        ]);
        if ($validation) {
            // dd($request->all());
            if ($request->hasFile('images')) {
                $image = time() . '.' . $request->images->extension();
                $request->images->move(public_path('images/pets'), $image);
            }
        }
        $pet = new Pet;
        $pet->name = $request->name;
        $pet->image = $image;
        $pet->kind = $request->kind;
        $pet->weigth = $request->weigth;
        $pet->age = $request->age;
        $pet->breed = $request->breed;
        $pet->location = $request->location;
        $pet->description = $request->description;
        $pet->active = $request->active;
        $pet->adopted = $request->adopted;

        if($pet->save()){
            return redirect('pets')
            ->with('message', 'The Pet: ' . $pet->name . ' Was added successful!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        return view('pets.show')->with('pet', $pet);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pet $pet)
    {
        return view('pets.edit', compact('pet'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet)
    {
        $request->validate([

            'name' => ['required', 'string', 'unique:' . Pet::class . ',name,' . $pet->id],
            'images'=> ['image'],
            'kind'=>['required','string'],
            'weight'=>['required','numeric'],
            'age'=>['required','numeric',],
            'breed'=>['required','string'],
            'location'=>['required','string'],
            'description'=>['required','string'],
            'active' => ['required'],
            'adopted' => ['required'],
        ]);

        $pet->name = $request->name;
        $pet->kind = $request->kind;
        $pet->weight = $request->weight;
        $pet->age = $request->age;
        $pet->breed = $request->breed;
        $pet->location = $request->location;
        $pet->description = $request->description;
        $pet->active = $request->active;
        $pet->adopted = $request->adopted;

        // Manejar la foto
        if ($request->hasFile('images')) {
            // Eliminar foto anterior si no es la default
            if ($pet->image && $pet->image != 'default.jpg') {
                $oldImagePath = public_path('images/pets/' . $pet->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            $photoName = time() . '.' . $request->images->extension();
            $request->images->move(public_path('images/pets'), $photoName);
            $pet->image = $photoName;
        }

        if($pet->save()){
            return redirect('pets')
            ->with('message', 'The Pet: ' . $pet->name . ' Was updated successful!');
        }

        return back()->with('error', 'Error updating pet');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        //Delete old image
        if (
            $pet->image != 'no-image.png' &&
            file_exists(public_path('images/pets/' . $pet->image))
        ) {
            unlink(public_path('images/pets/' . $pet->image));
        }
        if ($pet->delete()) {
            return redirect('pets')
                ->with('message', 'The Pet: ' . $pet->name . ' was delete successfully!');
        }
    }

    /**
     * Generate a PDF file
     */
    public function pdf()
    {
        $pets = Pet::all();
        $pdf = PDF::loadView('pets.pdf', compact('pets'));
        return $pdf->download('allpets.pdf');
    }

    /**
     * Generate a Excel file
     */
    public function excel()
    {
        return Excel::download(new UsersExport, 'allpets.xlsx');
    }
}
