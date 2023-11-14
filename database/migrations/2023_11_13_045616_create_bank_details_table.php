<?php

use App\Models\Bank;
use App\Models\Company;
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
        Schema::create('bank_details', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Company::class);
            $table->enum('type', ['FIAT', 'CRYPTO']);
            $table->string('note')->nullable();

            $table->foreignIdFor(Bank::class)->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_name')->nullable();

            $table->string('token_name')->nullable();
            $table->string('token_type')->nullable();
            $table->string('wallet_address')->nullable();

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
        Schema::dropIfExists('bank_details');
    }
};
