<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title')</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@5" rel="stylesheet" type="text/css" />
</head>
<body class="bg-[linear-gradient(to_top,#000c,#0000),url(images/bg-welcome.jpg)] bg-center bg-no-repeat bg-cover text-white min-h-dvh flex flex-col gap-2 justify-center items-center">
    <main>
        @yield('content')
    </main>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <script>
        @yield('js')
    </script>
</body>
</html>
