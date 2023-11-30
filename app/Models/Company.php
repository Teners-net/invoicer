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

    public function users()
    {
        return $this->hasMany(CompanyUser::class);
    }

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
        return $this->belongsTo(Currency::class);
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
    public function getLogoPublicUrlAttribute()
    {
        return ($this->logo) ? 'storage/company_logo/' . $this->logo : null;
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
        'logo_url',
        'logo_public_url',
    ];
}
