<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Currency;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Platform\Setting;
use App\Models\Product;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    use CompanyTrait;

    private $rules = [
        'draft' => 'required',
        'customer_id' => 'nullable|required_if:draft,false|exists:customers,id',
        'products' => 'required|array',
        'products.*.product' => 'required|array',
        'products.*.product.id' => 'required|exists:products,id',
        'due_at' => 'nullable|required_if:draft,false|date',
        'note' => 'nullable|string',
        'total_amount' => 'required|numeric'
    ];

    /**
     * Show all of the resource.
     */
    public function index()
    {
        $invoices = $this->getCurrentCompany()->invoices;

        $overview = [
            'all' => $invoices->count(),
            'paid' => $invoices->where('paid', true)->count(),
            'unpaid' => $invoices->where('paid', false)->count(),
        ];

        return Inertia::render('App/Invoice/Index', [
            'invoices' => $this->getCurrentCompany()->invoices()->with('customer')->get(),
            'overview' => $overview
        ]);
    }

    /**
     * Display the create page for a new resource.
     */
    public function create()
    {
        $company = $this->getCurrentCompany();

        return Inertia::render('App/Invoice/Create', [
            'products' => $company->products()->with('currency')->get(),
            'customers' => $company->customers,
            'base_currency' => [
                'company' => $company->currency,
                'platform' => Currency::find(Setting::get('base_currency'))
            ],
        ]);
    }

    private function productInCompanyCurrency($product, $base_currency) {
        $amnt_platform = $product->price / ($product->currency['base_rate'] ?? 1);

        return number_format($amnt_platform * $base_currency['company']['base_rate'], 2, '.', '');
      }

    /**
     * Store a new resource.
     */
    public function store(Request $request)
    {
        $request->validate($this->rules, [
            'products.*.product.id' => 'Select product',
        ]);

        $company = $this->getCurrentCompany();

        $request->merge([
            'company_id' => $company->id,
            'currency_id' => $company->currency->id
        ]);

        $invoice = Invoice::create($request->all());

        foreach ($request->products as $_p) {
            $prod = (object) $_p['product'];

            InvoiceProduct::create([
                'product_id' => $prod->id,
                'invoice_id' => $invoice->id,
                'currency_id' => $prod->currency_id,
                'quantity' => $_p['quantity'],
                'amount' => $prod->price * $_p['quantity'],
                'name' => $prod->name,
            ]);
        }

        if (!$request->draft){
            $customer = Customer::findOrFail($request->customer_id);
            $this->confirmOwner($customer);

            return redirect()->route('invoices.setup', $invoice);
        }

        return redirect()->route('invoices.index');
    }

    /**
     */
    public function setup(Invoice $invoice)
    {
        $company = $this->getCurrentCompany();
        $invoice = Invoice::with('customer', 'currency')->find($invoice->id);
        $company = Company::with('paymentChannels', 'paymentChannels.currency')->find($company->id);

        return Inertia::render('App/Invoice/InvoicePaymentMethod', [
            'invoice' => $invoice,
            'payment_channels' => $company->paymentChannels,
            'base_currency' => [
                'company' => $company->currency,
                'platform' => Setting::get('base_currency')
            ],
        ]);
    }

    /**
     */
    public function setupUpdate(Request $request, Invoice $invoice)
    {
        $request->validate([
            'payment_channels' => 'required|array',
            'is_recuring' => 'required|boolean'
        ], [
            'payment_channels.required' => 'Select at least one payment channel'
        ]);

        $invoice->channels()->attach($request->payment_channels);

        return redirect()->route('invoices.index');
    }

    /**
     * Edit the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        $company = $this->getCurrentCompany();
        $invoice = Invoice::with('currency', 'customer', 'products', 'products.product', 'products.currency', 'products.product.currency')->find($invoice->id);

        return Inertia::render('App/Invoice/Create', [
            'products' => $company->products()->with('currency')->get(),
            'customers' => $company->customers,
            'base_currency' => [
                'company' => $company->currency,
                'platform' => Currency::find(Setting::get('base_currency'))
            ],
            'invoice' => $invoice
        ]);
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $request->validate($this->rules, [
            'products.*.product.id' => 'Select product',
        ]);

        $company = $this->getCurrentCompany();

        $request->merge([
            'currency_id' => $company->currency->id
        ]);

        $invoice->update($request->all());

        $invoice->products()->delete();

        foreach ($request->products as $_p) {
            $prod = (object) $_p['product'];

            InvoiceProduct::create([
                'product_id' => $prod->id,
                'invoice_id' => $invoice->id,
                'currency_id' => $prod->currency_id,
                'quantity' => $_p['quantity'],
                'amount' => $prod->price * $_p['quantity'],
                'name' => $prod->name,
            ]);
        }

        $this->confirmOwner($invoice);

        if (!$request->draft){
            $customer = Customer::findOrFail($request->customer_id);
            $this->confirmOwner($customer);

            return redirect()->route('invoices.setup', $invoice);
        }

        return redirect()->route('invoices.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $this->confirmOwner($invoice);

        return Inertia::render('App/Invoice/Show', [
            'invoice' => $invoice
        ]);
    }

    /**
     * Destroy the specified resource.
     */
    public function destroy(Invoice $customer)
    {
        $this->confirmOwner($customer);
        $customer->forceDelete();

        return redirect()->route('invoices.index');
    }
}
