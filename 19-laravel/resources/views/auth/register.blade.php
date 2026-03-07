{{-- <x-guest-layout>
    <form method="POST" action="{{ route('register') }}">
        @csrf

        <!-- Name -->
        <div>
            <x-input-label for="name" :value="__('Name')" />
            <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required autofocus autocomplete="name" />
            <x-input-error :messages="$errors->get('name')" class="mt-2" />
        </div>

        <!-- Email Address -->
        <div class="mt-4">
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Confirm Password -->
        <div class="mt-4">
            <x-input-label for="password_confirmation" :value="__('Confirm Password')" />

            <x-text-input id="password_confirmation" class="block mt-1 w-full"
                            type="password"
                            name="password_confirmation" required autocomplete="new-password" />

            <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="{{ route('login') }}">
                {{ __('Already registered?') }}
            </a>

            <x-primary-button class="ms-4">
                {{ __('Register') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}
@extends('layouts.app')

@section('title', 'Larapets: Login')
@section('content')

    <section class="bg-[#0006] p-4 border-white border-2 rounded-md w-fit flex flex-col justify-center items-center">

        <h1 class="text-4xl flex border-b-2 pb-2 gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentColor" viewBox="0 0 256 256"><path d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z"></path></svg>
            Register
        </h1>
        {{-- -Register Form --}}
        <form method="POST" action="{{ route('register') }}"
            class="flex flex-col md:flex-row gap-x-2"
        >
            @csrf
            {{-- -First column --}}
            <div class="w-full md:w-80 flex flex-col gap-y-2 text-white">
                {{-- Document --}}
                <label for="label">Document:</label>
                <input class="input bg-[#0009] outline-1" type="text" name="document" value="{{ old('document') }}"
                placeholder="7500000001">
                @error('document')
                    <small class="badge badge-error w-full ">{{ $message }} </small>
                @enderror

            {{-- Fullname --}}
                <label for="label">Fullname:</label>
                <input class="input bg-[#0009] outline-1" type="text" name="fullname" value="{{ old('fullname') }}"
                placeholder="Jeremias Sprinfield">
                @error('fullname')
                    <small class="badge badge-error w-full ">{{ $message }} </small>
                @enderror
                {{-- Gender --}}
                <label for="label">Gender:</label>
                <select name="gender" class="select bg-[#0009] outline-1">
                    <option value="">Select...</option>
                    <option value="Female" @if (old('gender') == 'Female') selected @endif>Female</option>
                    <option value="Male"@if (old('gender') == 'Male') selected @endif>Male</option>
                </select>
                @error('genders')
                    <small class="badge badge-error w-full ">{{ $message }} </small>
                @enderror
                {{-- BirthDate --}}
                <label for="label">BirthDate:</label>
                <input class="input bg-[#0009] outline-1" type="text" name="birthdate" value="{{ old('birthdate') }}"
                placeholder="2000-12-25">
                @error('birthdate')
                    <small class="badge badge-error w-full ">{{ $message }} </small>
                @enderror
            </div>
            {{-- Seconds column --}}
            <div class="w-full md:w-80 flex flex-col gap-2 text-white">
                {{-- Phone --}}
                <label for="label">Phone:</label>
                <input class="input bg-[#0009] outline-1" type="text" name="phone" value="{{ old('phone') }}"
                placeholder="3100000005">
                @error('phone')
                    <small class="badge badge-error w-full ">{{ $message }} </small>
                @enderror
            </div>
        </form>
    </section>
@endsection
