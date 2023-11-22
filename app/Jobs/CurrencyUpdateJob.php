<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\Platform\Setting;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class CurrencyUpdateJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private string $exchangeRatesKey;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->exchangeRatesKey = config('app.secrets.exchange_rate_pro');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $baseCurrencyId = Setting::get('base_currency');
        $baseCurrency = Currency::find($baseCurrencyId);

        $exchangeRates = $this->fetchExchangeRates($baseCurrency->code, '1m');

        if ($exchangeRates) {
            foreach ($exchangeRates as $currencyCode => $rate) {
                $currency = Currency::where('code', $currencyCode)->first();

                if ($currency) $currency->update(['base_rate' => $rate]);
            }
        }
    }

    private function fetchExchangeRates($baseCurrency, $resolution)
    {
        $currencies = Currency::all()->pluck('code');
        $currenciesString = implode(',', $currencies->toArray());

        $requestData = [
            'base' => $baseCurrency,
            'resolution' => $resolution,
            'places' => 6,
            'currencies' => $currenciesString
        ];

        try {
            $response = Http::withHeaders([
                'X-RapidAPI-Host' => 'exchangeratespro.p.rapidapi.com',
                'X-RapidAPI-Key' => $this->exchangeRatesKey,
            ])->get('https://exchangeratespro.p.rapidapi.com/latest', $requestData);

            return $response->successful() ? $response->json()['rates'] : null;
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
