<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Jobs\UpdateStockJob;
use App\Mail\NewInvoiceMail;
use App\Models\Company;
use App\Models\Currency;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\InvoiceProduct;
use App\Models\Platform\Setting;
use App\Models\Product;
use App\Services\InvoiceService;
use App\Traits\CompanyTrait;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    use CompanyTrait, NotificationTrait;

    private $rules = [
        'customer_id' => 'nullable|exists:customers,id',
        'products' => 'required|array',
        'products.*.product' => 'required|array',
        'products.*.product.id' => 'required|exists:products,id',
        'due_at' => 'nullable|date',
        'note' => 'nullable|string',
        'sub_amount' => 'required|numeric',
        'total_amount' => 'required|numeric',
        'discount_type' => 'in:PERCENTAGE, FIXED',
        'discount_value' => 'nullable|numeric'
    ];

    /**
     * Show all of the resource.
     */
    public function index()
    {
        $invoices = $this->getCurrentCompany()->invoices;
        $drafts = $invoices->whereNull('sent_at');
        $sent = $invoices->whereNotNull('sent_at');

        $overview = [
            'all' => $invoices->count(),
            'draft' => $drafts->count(),
            'paid' => $sent->whereNotNull('paid_at')->count(),
            'unpaid' => $sent->whereNull('paid_at')->where('due_at', '<', now())->count(),
            'overdue' => $sent->whereNull('paid_at')->where('due_at', '>', now())->count()
        ];

        return Inertia::render('App/Invoice/Index', [
            'invoices' => $this->getCurrentCompany()->invoices()->with('customer', 'currency')->get(),
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
                'platform' => Setting::platformCurrency()
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
                'name' => $prod->name,
                'quantity' => $_p['quantity'],
                'amount' => $prod->price * $_p['quantity'],
                'amount_in_base' => $_p['amount_in_base']
            ]);
        }

        InvoiceService::generateInvoice($invoice);

        $this->notify('Invoice Created!');
        return redirect()->route('invoices.show', $invoice);
    }

    /**
     */
    public function actions(Request $request, Invoice $invoice, string $action)
    {
        // $request->validate([
        //     'payment_channels' => 'required|array',
        //     'is_recuring' => 'required|boolean'
        // ], [
        //     'payment_channels.required' => 'Select at least one payment channel'
        // ]);

        // $invoice->channels()->attach($request->payment_channels);

        $this->confirmOwner($invoice->customer);

        if ($action == 'SEND') {
            $invoice->update([
                'sent_at' => now()
            ]);

            UpdateStockJob::dispatch($invoice->products);

            try {
                if ($invoice->company->send_invoice_email)

                Mail::to($invoice->customer->email)->send(new NewInvoiceMail($invoice));
            } catch (\Throwable $th) {
            }

            $this->notify('Invoice Sent!');
        }

        if ($action == 'MARK_PAID') {
            $invoice->update([
                'paid_at' => now()
            ]);

            $this->notify('Invoice Marked Paid!');
        }

        return redirect()->route('invoices.show', $invoice);
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
                'name' => $prod->name,
                'quantity' => $_p['quantity'],
                'amount' => $prod->price * $_p['quantity'],
                'amount_in_base' => $_p['amount_in_base']
            ]);
        }

        InvoiceService::generateInvoice($invoice);

        $this->notify('Invoice Updated!');
        return redirect()->route('invoices.show', $invoice);
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $this->confirmOwner($invoice);
        $company = $this->getCurrentCompany();

        $invoice = Invoice::with('customer', 'currency')->find($invoice->id);
        $company = Company::with('paymentChannels', 'paymentChannels.currency')->find($company->id);

        return Inertia::render('App/Invoice/Show', [
            'invoice' => $invoice,
            'payment_channels' => $company->paymentChannels,
            // 'base_currency' => [
            //     'company' => $company->currency,
            //     'platform' => Setting::platformCurrency()
            // ],
        ]);
    }

    /**
     * Destroy the specified resource.
     */
    public function destroy(Invoice $invoice)
    {
        $this->confirmOwner($invoice);
        $invoice->forceDelete();

        $this->notify('Invoice Deleted!');
        return redirect()->route('invoices.index');
    }
}
