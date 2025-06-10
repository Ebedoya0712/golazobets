<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('section_items', function (Blueprint $table) {
			$table->id();
			$table->foreignId('page_section_id')->constrained()->onDelete('cascade');
			$table->unsignedBigInteger('model_id');
			$table->string('model_type');
			$table->integer('sort_order')->default(0);
			$table->timestamps();

			$table->index(['model_id', 'model_type']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('section_items');
	}
};
