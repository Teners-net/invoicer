<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Company;
use App\Models\Customer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $this->call([
            PlatformSeeder::class,
            AppSeeders::class,
        ]);

        foreach (Company::all() as $company) {
            Customer::factory(10)->create([
                'company_id' => $company->id
            ]);
        }
    }
}
