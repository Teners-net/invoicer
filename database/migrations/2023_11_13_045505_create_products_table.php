<?php

use App\Models\Company;
use App\Models\Currency;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Company::class);
            $table->foreignIdFor(Currency::class);
            $table->string('slug')->unique();
            $table->string('name');
            $table->float('price');
            $table->integer('stock')->nullable();
            $table->text('description')->nullable();
            $table->enum('type', ['GOODS', 'SERVICE']);
            $table->boolean('accept_crypto')->default(true);
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
        Schema::dropIfExists('products');
    }
};
