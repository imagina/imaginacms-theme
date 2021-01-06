<!DOCTYPE html>
<html lang="{{ LaravelLocalization::getCurrentLocale() }}">
<head>
    <meta charset="UTF-8">
    @section('meta')
        <meta name="description" content="@setting('core::site-description')"/>
    @show
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}"/>
    <title>@section('title')@setting('core::site-name')@show</title>
    @if(isset($alternate))
        @foreach($alternate as $alternateLocale=>$alternateSlug)
            <link rel="alternate" hreflang="{{$alternateLocale}}" href="{{url($alternateLocale.'/'.$alternateSlug)}}">
        @endforeach
    @endif
    <link rel="canonical" href="{{url()->current()}}" />
    <link rel="shortcut icon" href="@setting('isite::favicon')">
    <link rel="canonical" href="{{canonical_url()}}"/>
    {!! Theme::style('css/app.css?v='.config('app.version')) !!}
 
    {!! Theme::script('js/app.js?v='.config('app.version')) !!}
    
    @stack('css-stack')
    @livewireStyles
</head>
<body>

<div id="page-wrapper">
    @include('partials.variables')
    @include('partials.header')
    @yield('content')
    @include('partials.footer')
</div>

{!! Theme::style('css/secondary.css?v='.config('app.version')) !!}
{!! Theme::script('js/secondary.js?v='.config('app.version')) !!}

@livewireScripts
<x-livewire-alert::scripts />

<script type="text/javascript" src="https://platform-api.sharethis.com/js/sharethis.js#property=5fd9384eb64d610011fa8357&product=inline-share-buttons" async="async"></script>
@yield('scripts-owl')
@yield('scripts-header')
@yield('scripts')


{{-- Custom CSS --}}
@if((Setting::has('isite::customCss')))
    <style> {!! Setting::get('isite::customCss') !!} </style>
@endif


{{-- Custom JS --}}
@if(Setting::has('isite::customJs'))
    <script> {!! Setting::get('isite::customJs') !!} </script>
@endif


<?php if (Setting::has('isite::chat')): ?>
{!! Setting::get('isite::chat') !!}
<?php endif; ?>

<?php if (Setting::has('core::analytics-script')): ?>
{!! Setting::get('core::analytics-script') !!}
<?php endif; ?>
@stack('js-stack')
</body>
</html>
