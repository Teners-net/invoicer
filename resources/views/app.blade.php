<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="author" content="Teners">
  <meta name="description" content="Get the best talent for your projects">

  <title inertia>{{ config('app.name', 'Laravel') }}</title>
  <link rel="icon" type="image/png" href="{{ asset('imgs/brand/invoicer.png') }}">

  <meta http-equiv="Content-Security-Policy" content="" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=inter:100,100i,200,200i,300,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i" rel="stylesheet" />

  <!-- Scripts -->
  @routes
  @viteReactRefresh
  @vite(['resources/js/app.jsx'])
  @inertiaHead
</head>

<!-- subpixel- -->
<body class="font-sans antialiased bg-gray-50 dark:bg-gray-950 text-gray-950 dark:text-gray-50 relative">
  @inertia
</body>

</html>
