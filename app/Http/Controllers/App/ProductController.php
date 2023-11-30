<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\CompanyTrait;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    use CompanyTrait, NotificationTrait;

    private $rules = [
        'name' => 'required|string|min:2',
        'price' => 'required|numeric|min:0.01',
        'stock' => 'nullable|numeric|min:0',
        'type' => 'required|in:GOODS,SERVICE',
        'description' => 'nullable|string|max:255',
        'accept_crypto' => 'nullable',
    ];

    public function index()
    {
        $products = $this->getCurrentCompany()->products()->with('currency')->get();

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

    public function store(Request $request)
    {
        $request->validate($this->rules);
        $request->merge([
            'company_id' => $this->getCurrentCompany()->id,
        ]);

        Product::create($request->all());

        $this->notify('Product Created!');
        return redirect()->back();
    }

    public function update(Request $request, Product $product)
    {
        $request->validate($this->rules);

        $product->update($request->all());
        $this->confirmOwner($product);

        $this->notify('Product Updated!');
        return redirect()->route('products.index');
    }

    public function show(Product $product)
    {
        $this->confirmOwner($product);
        $product = Product::with('currency')->find($product->id);

        return Inertia::render('App/Product/Show', [
            'product' => $product
        ]);
    }

    public function destroy(Product $product)
    {
        $this->confirmOwner($product);
        $product->forceDelete();

        $this->notify('Product Deleted!');
        return redirect()->route('products.index');
    }
}
