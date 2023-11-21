<?php

use App\Models\Company;
use App\Models\Currency;
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
            $table->foreignIdFor(Company::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(Customer::class)->nullable()->constrained()->nullOnDelete();
            $table->foreignIdFor(Currency::class)->constrained()->restrictOnDelete();

            $table->string('slug')->unique();
            $table->float('total_amount', 18);
            $table->boolean('paid')->default(false);
            $table->boolean('draft')->default(false);

            $table->string('invoice_file')->nullable();
            $table->timestamp('due_at')->nullable();
            $table->timestamp('send_at')->nullable();

            $table->boolean('is_recuring')->default(false);
            $table->mediumInteger('recuring_interval')->nullable();
            $table->enum('recuring_interval_unit', ['Month', 'Day', 'Year'])->nullable();
            
            $table->text('note')->nullable();

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
