<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $firstName = fake()->firstName();
        $lastName = fake()->randomElement([fake()->lastName(), null]);

        return [
            'first_name' => $firstName,
            'last_name' => $lastName,
            'email' => strtolower($firstName . ($lastName ? '.' . $lastName : '') . '@' . fake()->freeEmailDomain()),
            'phone' => fake()->randomElement([substr(fake()->phoneNumber(), 0, 13), null]),
            'address' => fake()->randomElement([fake()->address(), null]),
            'company_id' => Company::inRandomOrder()->first()->id,
        ];
    }
}
