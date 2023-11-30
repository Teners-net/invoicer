<?php
namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\Platform\Setting;
use App\Traits\CompanyTrait;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Platinum\LaravelExtras\Traits\FileUploadTrait;

class CompanyController extends Controller
{
    use CompanyTrait, FileUploadTrait, NotificationTrait;

    private $details_rules = [
        'website' => 'nullable|url:http,https|max:200',
        'contact_email' => 'nullable|email',
        'contact_phone' => 'nullable|string',
        'address' => 'nullable|string',
    ];

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company_id = $this->getCurrentCompany()->id;
        $company = Company::with('paymentChannels', 'paymentChannels.currency')->find($company_id);

        return Inertia::render('App/Account/Index', [
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

        return Inertia::render('App/Account/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate(
            array_merge($this->details_rules, [
                'name' => 'required|string|min:3|max:200|unique:companies,name',
            ])
        );

        $request->merge([
            'currency_id' => Setting::platformCurrency()->id
        ]);

        $company = Company::create($request->all());
        $user = auth()->user();

        CompanyUser::create([
            'user_id' => $user->sub,
            'company_id' => $company->id,
            'email' => $user->email,
            'is_owner' => true,
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Update the specified resource in storage.
     * @param  \Illuminate\Http\Request  $request
     */
    public function update(Request $request, Company $company)
    {
        $request->validate(
            array_merge($this->details_rules, [
                'name' =>  [
                    'required', 'string', 'min:3', 'max:200',
                    Rule::unique('companies')->ignore($company->id),
                ],
            ])
        );
        $company->update($request->all());

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function logo(Request $request, Company $company)
    {
        $request->validate([
            'logo' => 'required|file|max:6000|mimes:jpeg,png,jpg'
        ], [
            'logo.mimes' => 'The logo must be a file of type: jpeg, png or jpg.'
        ]);

        Storage::delete('company_logo/' . $request->user()->avater);
        $logoUploaded = $this->uploadFile($request->file('logo'), null, 'company_logo');
        $company->update(['logo' => $logoUploaded->file->name]);

        $this->notify('Company Logo Updated!');
        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function branding(Request $request, Company $company)
    {
        $request->validate([
            'primary_color' => 'required|string|max:9',
            'secondary_color' => 'required|string|max:9'
        ]);

        $user = $this->authUser()->user_id;
        $request_user = $company->users->where('is_owner', true)->first()->user_id;

        if($user != $request_user) return ;
        $company->update($request->all());

        return redirect()->back();
    }
}
