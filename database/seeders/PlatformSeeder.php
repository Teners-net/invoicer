<?php

namespace Database\Seeders;

use App\Models\Currency;
use App\Models\Platform\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlatformSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $currencies = [
            [
                'name' => 'Nigerian Naira',
                'code' => 'NGN',
                'symbol' => '₦',
                'base_rate' => 1
            ],
            [
                'name' => 'South African rand',
                'code' => 'ZAR',
                'symbol' => 'R',
                'base_rate' => 0.022
            ],
            [
                'name' => 'Ugandan shilling',
                'code' => 'UGX',
                'symbol' => 'USh',
                'base_rate' => 4.57
            ],
            [
                'name' => 'US Dollar',
                'code' => 'USD',
                'symbol' => '$',
                'base_rate' => 0.0012
            ]
        ];

        foreach ($currencies as $currency) {
            Currency::create($currency);
        }

        $settings = [
            'base_currency' => Currency::where('code', 'NGN')->first()->id
        ];

        foreach ($settings as $key => $value) {
            Setting::create([
                'key' => $key,
                'value' => $value
            ]);
        }
    }
}
