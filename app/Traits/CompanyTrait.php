<?php

namespace App\Traits;

use App\Models\Company;
use App\Models\CompanyUser;

trait CompanyTrait
{
    private function authUser()
    {
        $user = auth()->user();
        return $user ? CompanyUser::where('user_id', $user->sub)->first() : null;
    }

    private function getCurrentCompany(): ?Company
    {
        $company_user = $this->authUser();

        return $company_user ? Company::with('currency')->find($company_user->company_id) : null;
    }

    private function confirmOwner($product)
    {
        $company = $this->getCurrentCompany();
        if ($product->company_id != $company->id) return redirect()->route('logout');
    }
}
