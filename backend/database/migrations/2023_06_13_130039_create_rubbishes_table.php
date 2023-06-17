<?php

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
        Schema::create('rubbishes', function (Blueprint $table) {
            $table->id();
            $table->string('uniq_id', 20)->nullable();
            $table->enum('category', ['organik', 'unorganik', 'unknown'])->default('unknown');
            $table->float('max_weight')->default(0);
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
        Schema::dropIfExists('rubbishes');
    }
};
