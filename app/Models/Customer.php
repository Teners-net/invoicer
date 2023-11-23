<?php

namespace App\Models;

use App\Traits\UtilityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Platinum\LaravelExtras\Traits\Sluggable;

class Customer extends Model
{
    use HasFactory, Sluggable, UtilityTrait;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'updated_at',
    ];

    public function getFullNameAttribute(): string {
        return "$this->first_name $this->last_name";
    }

    public $appends = [
        'full_name'
    ];

    protected function generateSlug()
    {
        return strtoupper('CUS-' . $this->getRandomString(24, 0.75));
    }
}
