<?php

namespace App\Traits;

use App\Models\Company;
use App\Models\CompanyUser;

trait CompanyTrait
{
    private function getCurrentCompany():? Company
    {

        $user = auth()->user();
        $user_company = CompanyUser::where('user_id', $user->sub)->first();

        if ($user && $user_company) {
            return $user_company->company;
        }

        return null;
    }

    private function confirmOwner($product)
    {
        $company = $this->getCurrentCompany();

        if ($product->company_id != $company->id)
            return redirect()->route('logout');
    }
}
