<?php

namespace App\Traits;

use App\Models\Company;
use App\Models\CompanyUser;

trait CompanyTrait
{
    private function getCurrentCompany(): Company
    {

        $user = auth()->user();
        $user_company = CompanyUser::where('user_id', $user->sub)->first();

        return $user_company->company;
    }

    private function confirmOwnsProduct($product)
    {
        $company = $this->getCurrentCompany();

        if ($product->company_id != $company->id)
            return redirect()->route('logout');
    }
}
