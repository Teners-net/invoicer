<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\CompanyUser;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $user_company = CompanyUser::where('user_id', $user->sub)->first();

        $overview = [
            'customers' => $user_company->company->customers->count(),
            'products' => $user_company->company->products->count(),
            'invoices' => $user_company->company->invoices->count(),
        ];

        return Inertia::render('App/Dashboard', [
            'overview' => $overview
        ]);
    }
}
