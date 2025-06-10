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
		Schema::create('tipsters', function (Blueprint $table) {
			$table->id();
			// User
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');

			$table->string('type');
			$table->string('cover_image')->nullable();
			$table->decimal('subscription_price', 8, 2)->nullable();

			// Sport
			$table->foreignId('sport_id')->constrained('sports')->onDelete('cascade');

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tipsters');
	}
};
