<?php

namespace App\Traits;

trait NotificationTrait
{
    public function notify(string $body, ?string $type = 'success', ?string $header = null)
    {
        session()->flash('notify', [
            'type' => $type,
            'header' => $header,
            'body' => $body,
        ]);
    }
}
