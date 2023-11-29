<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\Dispatchable;

class UpdateStockJob
{
    use Dispatchable;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(
        private Collection $products
    ) {
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        foreach ($this->products as $prod) {
            $product = Product::find($prod->product_id);

            if ($product->type == 'GOODS') {

                if ($product->stock >= $prod->quantity)
                    $product->update([
                        'stock' => $product->stock - $prod->quantity
                    ]);

                else
                    $product->update([
                        'stock' => 0
                    ]);
            }
        }

        return;
    }
}
