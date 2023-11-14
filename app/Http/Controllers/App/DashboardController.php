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

        $inv = $user_company->company->invoices();
        $inv_paid = $inv->where('paid', true);
        $inv_unpaid = $inv->where('paid', false);

        $paid = [
            'FIAT' => $inv_paid->where('type', 'FIAT')->sum('total_amount'),
            'CRYPTO' => $inv_paid->where('type', 'CRYPTO')->sum('total_amount'),

            'FIAT_count' => $inv_paid->where('type', 'FIAT')->count(),
            'CRYPTO_count' => $inv_paid->where('type', 'CRYPTO')->count(),
        ];

        $unpaid = [
            'FIAT' => $inv_unpaid->where('type', 'FIAT')->sum('total_amount'),
            'CRYPTO' => $inv_unpaid->where('type', 'CRYPTO')->sum('total_amount'),

            'FIAT_count' => $inv_unpaid->where('type', 'FIAT')->count(),
            'CRYPTO_count' => $inv_unpaid->where('type', 'CRYPTO')->count(),
        ];

        return Inertia::render('App/Dashboard', [
            'overview' => $overview,
            'paid' => $paid,
            'unpaid' => $unpaid,
        ]);
    }
}
