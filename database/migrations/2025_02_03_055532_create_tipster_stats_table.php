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
		Schema::create('tipster_stats', function (Blueprint $table) {
			$table->id();
			// Tipster
			$table->foreignId('tipster_id')->constrained('tipsters')->onDelete('cascade');

			$table->decimal('total_bet', 10, 2)->default(0);
			$table->decimal('profit', 10, 2)->default(0);
			$table->decimal('yield', 5, 2)->default(0);
			$table->decimal('score', 10, 2)->default(0);
			$table->decimal('average_stake', 5, 2)->default(0);
			$table->decimal('win_rate', 5, 2)->default(0);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('tipster_stats');
	}
};
