<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\CompanyUser;
use App\Models\Currency;
use App\Models\PaymentChannel;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AppSeeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $company = Company::create([
            'name' => 'Teners',
            'website' => 'https://teners.net',
            'currency_id' => Currency::inRandomOrder()->first()->id
        ]);

        CompanyUser::create([
            'company_id' => $company->id,
            'user_id' => 'google-oauth2|105241206780222283429',
        ]);

        $this->seedProducts($company->id, [
            ['name' => 'Python Development Course', 'price' => 199.99, 'stock' => 100, 'description' => 'Comprehensive Python course', 'type' => 'SERVICE'],
            ['name' => 'Python Coding Bootcamp', 'price' => 249.99, 'stock' => 75, 'description' => 'Intensive Python coding program', 'type' => 'SERVICE'],
            ['name' => 'Python Framework Mastery', 'price' => 149.99, 'stock' => 50, 'description' => 'Mastering popular Python frameworks', 'type' => 'SERVICE'],
            ['name' => 'Pythonista Hoodie', 'price' => 39.99, 'stock' => 200, 'description' => 'Stylish hoodie for Python enthusiasts', 'type' => 'GOODS'],
            ['name' => 'Web Development Starter Kit', 'price' => 299.99, 'stock' => 80, 'description' => 'Essential tools for web development', 'type' => 'GOODS'],
            ['name' => 'Database Management Service', 'price' => 499.99, 'stock' => 60, 'description' => 'Managed database hosting service', 'type' => 'SERVICE'],
            ['name' => 'Database Hosting Tier 1', 'price' => 90.99, 'stock' => 60, 'description' => 'Managed database hosting service', 'type' => 'SERVICE'],
            ['name' => 'Backend Development Bundle', 'price' => 199.99, 'stock' => 40, 'description' => 'Bundle for backend development', 'type' => 'GOODS'],
            ['name' => 'Coding Productivity Planner', 'price' => 29.99, 'stock' => 150, 'description' => 'Planner to boost coding productivity', 'type' => 'GOODS'],
            ['name' => 'E-commerce Platform Integration', 'price' => 799.99, 'stock' => 30, 'description' => 'Integrate e-commerce functionality', 'type' => 'SERVICE'],
            ['name' => 'Custom Software Development', 'price' => 1499.99, 'stock' => 20, 'description' => 'Tailored software solutions', 'type' => 'SERVICE'],
            ['name' => 'AI and Machine Learning Consultation', 'price' => 999.99, 'stock' => 15, 'description' => 'Expert consultation services', 'type' => 'SERVICE'],
            ['name' => 'Tech Startup Accelerator Note', 'price' => 2499.99, 'stock' => 10, 'description' => 'Accelerate your tech startup journey with a step-by-step training guide', 'type' => 'SERVICE'],
        ]);

        PaymentChannel::factory(2)->create([
            'company_id' => $company->id
        ]);
    }

    /**
     * Seed products for a given company.
     *
     * @param int $companyId
     * @param array $products
     * @return void
     */
    private function seedProducts($companyId, $products)
    {
        foreach ($products as $product) {
            $prod = array_merge($product, [
                'company_id' => $companyId,
                'currency_id' => Company::inRandomOrder()->first()->id,
            ]);
            
            Product::create($prod);
        }
    }
}
