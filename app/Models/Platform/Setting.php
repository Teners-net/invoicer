<?php

namespace App\Models\Platform;

use App\Models\Currency;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    /**
     * The attributes that are not mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = ['id'];

    /**
     * Get the platform's settings values
     *
     */
    public static function get($key)
    {
        // TODO: Use Cache
        $setting = self::where('key', $key)->first();

        return $setting->value;
    }

    public static function platformCurrency(): Currency {
        return Currency::find(self::get('base_currency'));
    }
}
