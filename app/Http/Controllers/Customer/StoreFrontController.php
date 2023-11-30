<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StoreFrontController extends Controller
{
    public function index(string $company_slug) {
        $company = Company::where('slug', $company_slug)->first();
        $products = $company->products()->with('currency')->get();

        return Inertia("Customer/Store/Index", [
            'products' => $products,
            'company' => $company
        ]);
    }
}
