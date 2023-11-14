<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\CompanyUser;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $user_company = CompanyUser::where('user_id', $user->sub)->first();

        return Inertia::render('App/Product');
    }
}
