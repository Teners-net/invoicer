<?php

use App\Models\Company;
use App\Models\Customer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Company::class);
            $table->foreignIdFor(Customer::class)->nullable();
            $table->string('slug')->unique();
            $table->float('total_amount');
            $table->boolean('paid')->default(false);
            $table->boolean('draft')->default(false);

            $table->boolean('accept_crypto')->default(true);
            $table->text('accepted_currencies')->nullable();
            $table->enum('type', ['FIAT', 'CRYPTO']);

            $table->string('invoice_file')->nullable();
            $table->timestamp('due_at')->nullable();
            $table->timestamp('sent_at')->nullable();

            $table->boolean('is_recuring')->default(false);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};
