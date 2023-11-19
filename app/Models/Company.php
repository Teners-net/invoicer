<?php

namespace App\Models;

use App\Models\Platform\Setting;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Platinum\LaravelExtras\Traits\Sluggable;

class Company extends Model
{
    use HasFactory, Sluggable;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function currency()
    {
        if ($this->currency_id) return $this->belongsTo(Currency::class);

        $base_currency_id = Setting::get('base_currency');

        return Currency::find($base_currency_id);
    }

    public function paymentChannels()
    {
        return $this->hasMany(PaymentChannel::class);
    }

    /**
     * Get the URL for the user's profile picture.
     *
     * @return string
     */
    public function getLogoUrlAttribute()
    {
        if ($this->logo) {
            return Storage::url('company_logo/' . $this->logo);
        }

        return asset('imgs/brand/invoicer_logo.png');
    }

    /**
     * Appends Accessors to the model
     */
    protected $appends = [
        'logo_url'
    ];
}
