@props([
    'url',
    'color' => 'primary',
    'align' => 'center',
])
<div style="text-align: <?php $align ; ?>;" class="action">
<a href="{{ $url }}" class="button button-{{ $color }}" target="_blank" rel="noopener">{{ $slot }}</a>
</div>