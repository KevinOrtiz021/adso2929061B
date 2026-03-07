{{-- <x-guest-layout>
    <div class="mb-4 text-sm text-gray-600">
        {{ __('Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('password.email') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <div class="flex items-center justify-end mt-4">
            <x-primary-button>
                {{ __('Email Password Reset Link') }}
            </x-primary-button>
        </div>
    </form>
</x-guest-layout> --}}
@extends('layouts.app')

@section('title', 'Larapets: Forgot Password')
@section('content')

    <section class="bg-[#0006] p-4 border-white border-2 rounded-md my-8 w-96 flex flex-col justify-center items-center my-5">

        <h1 class="text-4xl flex border-b-2 pb-2 gap-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-10" fill="currentcolor" viewBox="0 0 256 256">
                <path
                    d="M256,136a8,8,0,0,1-8,8H232v16a8,8,0,0,1-16,0V144H200a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,256,136Zm-57.87,58.85a8,8,0,0,1-12.26,10.3C165.75,181.19,138.09,168,108,168s-57.75,13.19-77.87,37.15a8,8,0,0,1-12.25-10.3c14.94-17.78,33.52-30.41,54.17-37.17a68,68,0,1,1,71.9,0C164.6,164.44,183.18,177.07,198.13,194.85ZM108,152a52,52,0,1,0-52-52A52.06,52.06,0,0,0,108,152Z">
                </path>
            </svg>
            Forgot Password
        </h1>
        <form method="post" action="{{ route('password.email') }}" class="mt-8 text-white">
            @csrf
            <label for="label">Email:</label>
                <input class="input bg-[#0009] outline-1 w-full" type="text" name="email" value="{{ old('email') }}"
                    placeholder="tucorreo@mail.com">
                @error('email')
                    <small class="badge badge-error w-full">{{ $message }} </small>
                @enderror
                <button class="btn btn-outline w-full mt-4">Email Password Reset Link</button>
        </form>
    </section>
@endsection

