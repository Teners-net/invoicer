<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\PaymentChannel;
use App\Traits\CompanyTrait;
use App\Traits\NotificationTrait;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentChannelController extends Controller
{
    use CompanyTrait, NotificationTrait;

    private $rules = [
        'bank_name' => 'required|string',
        'account_name' => 'required|string',
        'account_number' => 'required|string',
        'currency_id' => 'required|exists:currencies,id',
    ];

    /**
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $company = $this->getCurrentCompany();
        $paymentChannels = $company->paymentChannels()->with('currency')->get();

        return Inertia::render('App/Account/Partials/PaymentChannels', [
            'paymentChannels' => $paymentChannels
        ]);
    }

    /**
     * Store a new $paymentChannel
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate($this->rules);
        $request->merge([
            'company_id' => $this->getCurrentCompany()->id
        ]);

        PaymentChannel::updateOrCreate($request->all());

        $this->notify('Payment Channel Created!');
        return redirect()->back();
    }

    /**
     * Update the specified  $paymentChannel
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, PaymentChannel $paymentChannel)
    {
        $request->validate($this->rules);

        $this->confirmOwner($paymentChannel);
        $paymentChannel->update($request->all());

        $this->notify('Payment Channel Updated!');
        return redirect()->back();
    }

    /**
     * Remove the specified $paymentChannel
     * @return \Illuminate\Http\Response
     */
    public function destroy(PaymentChannel $paymentChannel)
    {
        $this->confirmOwner($paymentChannel);
        $paymentChannel->delete();

        $this->notify('Payment Channel Deleted!');
        return redirect()->back();
    }
}
