<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('image')->nullable();
            $table->string('kind');
            $table->decimal('weight', 5, 2)->nullable();
            $table->integer('age')->nullable();
            $table->string('breed')->nullable();
            $table->string('location')->nullable();
            $table->text('description')->nullable();
            $table->boolean('active')->default(true);
            $table->boolean('adopted')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};