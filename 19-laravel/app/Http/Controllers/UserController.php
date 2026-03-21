<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $users = User::all();
        $users = User::orderBy('id', 'desc')->paginate(12);
        return view('users.index')->with('users', $users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validation = $request->validate([

            'document' => ['required', 'numeric', 'unique:' . User::class],
            'fullname' => ['required', 'string'],
            'gender' => ['required'],
            'birthdate' => ['required', 'date'],
            'photo' => ['required', 'image'],
            'phone' => ['required', 'string'],
            'email' => ['required', 'string', 'lowercase', 'email', 'unique:' . User::class],
            'password' => ['required', 'confirmed'],
        ]);

        if ($validation) {
            // dd($request->all());
            if ($request->hasFile('photo')) {
                $photo = time() . '.' . $request->photo->extension();
                $request->photo->move(public_path('images'), $photo);
            }
        }

        $user = new User;
        $user->document = $request->document;
        $user->fullname = $request->fullname;
        $user->gender = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->photo = $photo;
        $user->phone = $request->phone;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        if ($user->save()) {
            return redirect('users')
                ->with('message', 'The USer: ' . $user->fullname . ' Was added successful!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return view('users.show')->with('user', $user);
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return view('users.edit', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'document' => ['required', 'numeric', 'unique:' . User::class . ',document,' . $user->id],
            'fullname' => ['required', 'string'],
            'gender'   => ['required'],
            'birthdate' => ['required', 'date'],
            'phone'    => ['required', 'string'],
            'email'    => ['required', 'string', 'lowercase', 'email', 'unique:' . User::class . ',email,' . $user->id],
            'photo'    => ['nullable', 'image'],
            'active'   => ['required'],
            'role'     => ['required'],
        ]);

        if ($request->hasFile('photo')) {
            $oldPhoto = public_path('images/' . $user->photo);
            if (file_exists($oldPhoto)) {
                unlink($oldPhoto);
            }
            $photo = time() . '.' . $request->photo->extension();
            $request->photo->move(public_path('images'), $photo);
            $user->photo = $photo;
        }

        $user->document  = $request->document;
        $user->fullname  = $request->fullname;
        $user->gender    = $request->gender;
        $user->birthdate = $request->birthdate;
        $user->phone     = $request->phone;
        $user->email     = $request->email;
        $user->active    = $request->active;
        $user->role      = $request->role;

        if ($user->save()) {
            return redirect('users')
                ->with('message', 'The User: ' . $user->fullname . ' was updated successfully!');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
