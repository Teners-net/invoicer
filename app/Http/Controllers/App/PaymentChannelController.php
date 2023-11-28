<?php

namespace App\Http\Controllers\App;

use App\Http\Controllers\Controller;
use App\Models\PaymentChannel;
use App\Traits\CompanyTrait;
use Illuminate\Http\Request;

class PaymentChannelController extends Controller
{
    use CompanyTrait;

    private $rules = [
        'bank_name' => 'required|string',
        'account_name' => 'required|string',
        'account_number' => 'required|string',
        'currency_id' => 'required|exists:currencies,id',
    ];

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

        return redirect()->back();
    }
}
