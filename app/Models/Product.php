<?php

namespace App\Models;

use App\Models\Currency;
use App\Models\Platform\Setting;
use Illuminate\Database\Eloquent\Model;
use Platinum\LaravelExtras\Traits\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory, Sluggable;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    public function currency() {
        return $this->belongsTo(Currency::class);
    }

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'float',
    ];
}
