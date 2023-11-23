<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\Platform\Setting;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CompanyController extends Controller
{
    use CompanyTrait;

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company_id = $this->getCurrentCompany()->id;
        $company = Company::with('paymentChannels', 'paymentChannels.currency')->find($company_id);

        return Inertia::render('App/Company/Index', [
            'company' => $company
        ]);
    }

    /**
     * Show the form for creating a new resource.
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $company = $this->getCurrentCompany();
        if ($company) return redirect()->route('dashboard');

        return Inertia::render('App/Company/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:3|max:200|unique:companies,name',
            'website' => 'nullable|url:http,https|max:200',
            'contact_email' => 'nullable|email',
            'contact_phone' => 'nullable|string',
            'address' => 'nullable|string',
        ]);

        $request->merge([
            'currency_id' => Setting::platformCurrency()->id
        ]);

        $company = Company::create($request->all());
        $user = auth()->user();

        CompanyUser::create([
            'user_id' => $user->sub,
            'company_id' => $company->id,
            'is_owner' => true,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function show(Company $company)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     */
    public function update(Request $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
