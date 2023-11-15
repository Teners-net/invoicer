<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    use CompanyTrait;

    private $rules = [
        'first_name' => 'required|string|max:100|min:2',
        'email' => 'required|email',
        'last_name' => 'nullable|string|max:100',
        'phone' => 'nullable|string|max:15',
        'address' => 'nullable|string',
    ];

    /**
     * Show all of the resource.
     */
    public function index()
    {
        $customers = $this->getCurrentCompany()->customers;

        $overview = [
            'all' => $customers->count()
        ];

        return Inertia::render('App/Customer/Index', [
            'customers' => $customers,
            'overview' => $overview
        ]);
    }

    /**
     * Display the create page for a new resource.
     */
    public function create()
    {
        return Inertia::render('App/Customer/Create');
    }

    /**
     * Store a new resource.
     */
    public function store(Request $request)
    {
        $request->validate($this->rules);

        $request->merge([
            'company_id' => $this->getCurrentCompany()->id,
            'currency_id' => 1
        ]);

        Customer::create($request->all());

        return redirect()->route('customers.index');
    }

    /**
     * Edit the specified resource.
     */
    public function edit(Customer $customer)
    {
        return Inertia::render('App/Customer/Create', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified resource.
     */
    public function update(Request $request, Customer $customer)
    {
        $request->validate($this->rules);

        $customer->update($request->all());

        $this->confirmOwner($customer);

        return redirect()->route('customers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        $this->confirmOwner($customer);

        return Inertia::render('App/Customer/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Destroy the specified resource.
     */
    public function destroy(Customer $customer)
    {
        $this->confirmOwner($customer);

        $customer->forceDelete();
    }
}
