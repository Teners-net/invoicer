<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Product;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    use CompanyTrait;

    private $rules = [
        'customer_id' => 'required',
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
            'invoices' => $invoices,
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
            'base_currency' => $company->currency
        ]);
    }

    /**
     * Store a new resource.
     */
    public function store(Request $request)
    {
        $request->validate([
            'draft' => 'required',
            'customer_id' => 'nullable|required_if:draft,false|exists:customers,id',
            'products' => 'required|array',
            'products.*.product' => 'required|array',
            'products.*.product.id' => 'required|exists:products,id',
            'due_at' => 'nullable|date',
            'note' => 'nullable|string'
        ], [
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

            return redirect()->route('invoices.setup');
        }

        return redirect()->route('invoices.index');
    }

    /**
     */
    public function setup(Invoice $invoice)
    {
        return Inertia::render('App/Invoice/InvoicePaymentMethod', [
            'invoice' => $invoice
        ]);
    }

    /**
     */
    public function setupUpdate(Invoice $invoice)
    {
    }

    /**
     * Edit the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        return Inertia::render('App/Invoice/Create', [
            'invoice' => $invoice
        ]);
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, Invoice $customer)
    {
        $request->validate($this->rules);

        $customer->update($request->all());

        $this->confirmOwner($customer);

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
    }
}
