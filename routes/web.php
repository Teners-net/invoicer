<?php

use App\Http\Controllers\App\CompanyController;
use App\Http\Controllers\App\CustomerController;
use App\Http\Controllers\App\DashboardController;
use App\Http\Controllers\App\InvoiceController;
use App\Http\Controllers\App\PaymentChannelController;
use App\Http\Controllers\App\ProductController;
use App\Http\Controllers\Customer\InvoiceController as CustomerInvoiceController;
use App\Http\Controllers\Customer\StoreFrontController;
use App\Http\Controllers\Platform\SubscriptionController;
use App\Jobs\CurrencyUpdateJob;
use App\Mail\NewInvoiceMail;
use App\Models\Invoice;
use App\Services\InvoiceService;
use Auth0\Laravel\Facade\Auth0;
use Barryvdh\DomPDF\Facade\Pdf as PDF;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/test', function () {
    CurrencyUpdateJob::dispatch();
    // $invoice = Invoice::find(1);
    // if ($invoice) {
    //     InvoiceService::generateInvoice($invoice);
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
Route::resource('invoice', CustomerInvoiceController::class)->only(['show', 'update']);

Route::controller(StoreFrontController::class)->group(function () {
    Route::get('store/{company_slug}', 'index')->name('store.index');
});

Route::middleware(['auth', 'company'])->group(function () {

    Route::controller(DashboardController::class)->prefix('dashboard')->group(function () {
        Route::get('', 'index')->name('dashboard');
        Route::get('sales', 'sales')->name('dashboard.sales');
        Route::get('products', 'products')->name('dashboard.products');
    });

    Route::resource('products', ProductController::class)->except(['create', 'edit']);
    Route::resource('customers', CustomerController::class)->except(['create', 'edit']);

    Route::controller(InvoiceController::class)->prefix('invoices')->group(function () {
        Route::post('actions/{invoice}/{action}', 'actions')->name('invoices.action');
    });
    Route::resource('invoices', InvoiceController::class);

    Route::resource('payment_channels', PaymentChannelController::class)->only(['index', 'store', 'update', 'destroy']);
});

Route::middleware(['auth'])->group(function () {
    Route::controller(CompanyController::class)->prefix('account')->group(function () {
        Route::get('', 'index')->name('account.index');
        Route::put('{company}/logo', 'logo')->name('company.logo');
        Route::patch('{company}/branding', 'branding')->name('company.branding');
    });
    Route::resource('company', CompanyController::class)->only(['store', 'update', 'create']);
});
