<?php

namespace App\Models;

use App\Traits\UtilityTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Platinum\LaravelExtras\Traits\Sluggable;

class Invoice extends Model
{
    use HasFactory, Sluggable, UtilityTrait;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    protected function generateSlug()
    {
        return strtoupper('INV-' . $this->getRandomString(10));
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function products()
    {
        return $this->hasMany(InvoiceProduct::class);
    }
}
