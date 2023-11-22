<?php

use App\Http\Controllers\App\CompanyController;
use App\Http\Controllers\App\CustomerController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\InvoiceController;
use App\Http\Controllers\App\PaymentChannelController;
use App\Http\Controllers\App\ProductController;
use App\Http\Controllers\Platform\SubscriptionController;
use App\Models\Invoice;
use Auth0\Laravel\Facade\Auth0;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
});
Route::get('/classic', function () {
    // $invoice = Invoice::with('company', 'customer', 'products', 'currency', 'channels')->find(1);

    // if ($type == 'pdf') {
    //     $pdf = PDF::loadView('templates.classic', [
    //         'invoice' => $invoice
    //     ]);

    //     return $pdf
    //         ->setPaper('a4')
    //         ->setOption(['dpi' => 150])
    //         ->setWarnings(true)
    //         ->stream();
    // }
});

Route::resource('pricing', SubscriptionController::class)->only(['index']);

Route::middleware(['auth', 'company'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('products', ProductController::class)->except(['create', 'edit']);
    Route::resource('customers', CustomerController::class);

    Route::controller(InvoiceController::class)->prefix('invoices')->group(function () {
        Route::get('{invoice}/setup', 'setup')->name('invoices.setup');
        Route::patch('{invoice}/setup', 'setupUpdate')->name('invoices.setup');
    });
    Route::resource('invoices', InvoiceController::class);

    Route::resource('payment_channels', PaymentChannelController::class)->only(['store', 'update', 'destroy']);
});

Route::middleware(['auth'])->group(function () {
    Route::resource('company', CompanyController::class)->only(['index', 'store', 'update']);
});
