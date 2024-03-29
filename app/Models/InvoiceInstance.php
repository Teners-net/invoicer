<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Teners\LaravelExtras\Traits\Sluggable;

class InvoiceInstance extends Model
{
    use HasFactory, Sluggable;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];
}
