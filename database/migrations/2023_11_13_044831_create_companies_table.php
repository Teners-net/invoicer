<?php

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
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200)->unique();
            $table->string('slug', 200)->unique();
            $table->foreignIdFor(Currency::class);

            $table->string('website', 100)->nullable();
            $table->string('contact_number')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('rc_number')->nullable();
            $table->string('address')->nullable();

            $table->string('logo')->nullable();
            $table->string('primary_color', 9)->default('#1a1423ff');
            $table->string('secondary_color', 9)->default('#372549ff');

            $table->boolean('send_invoice_email')->default(true);

            $table->timestamp('subscribed_at')->nullable();
            $table->timestamp('subscribed_till')->nullable();

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
        Schema::dropIfExists('companies');
    }
};
