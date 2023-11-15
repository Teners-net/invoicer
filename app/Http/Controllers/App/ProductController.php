<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use CompanyTrait;

    private $rules = [
        'name' => 'required|string',
        'price' => 'required|numeric|min:0.01',
        'stock' => 'nullable|numeric|min:0',
        'type' => 'required|in:GOODS,SERVICE',
        'description' => 'nullable|string|max:255',
        'accept_crypto' => 'nullable',
    ];

    public function index()
    {
        $products = $this->getCurrentCompany()->products;

        $overview = [
            'all' => $products->count(),
            'goods' => $products->where('type', 'GOODS')->count(),
            'services' => $products->where('type', 'SERVICE')->count(),
        ];

        return Inertia::render('App/Product/Index', [
            'products' => $products,
            'overview' => $overview
        ]);
    }

    public function create()
    {
        return Inertia::render('App/Product/Create');
    }

    public function store(Request $request)
    {
        $request->validate($this->rules);

        $request->merge([
            'company_id' => $this->getCurrentCompany()->id,
            'currency_id' => 1
        ]);

        Product::create($request->all());

        return redirect()->route('products.index');
    }

    public function edit(Product $product)
    {
        return Inertia::render('App/Product/Create', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate($this->rules);

        $product->update($request->all());

        $this->confirmOwnsProduct($product);

        return redirect()->route('products.index');
    }

    public function show(Product $product)
    {
        $this->confirmOwnsProduct($product);

        return Inertia::render('App/Product/Show', [
            'product' => $product
        ]);
    }

    public function destroy(Product $product)
    {
        $this->confirmOwnsProduct($product);

        $product->forceDelete();
    }
}
