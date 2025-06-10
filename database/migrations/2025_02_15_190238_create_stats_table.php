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
		Schema::create('stats', function (Blueprint $table) {
			$table->id();
			// Tipster
			$table->foreignId('tipster_id')->constrained('tipsters')->onDelete('cascade');
			// Date
			$table->integer('year')->nullable();
			$table->integer('month')->nullable();
			// Stats
			$table->integer('total_picks')->default(0);
			$table->decimal('total_bet', 10, 2)->default(0);
			$table->decimal('profit', 10, 2)->default(0);
			$table->decimal('yield', 5, 2)->default(0);
			$table->decimal('score', 10, 2)->default(0);
			$table->decimal('average_stake', 5, 2)->default(0);
			$table->float('average_odds')->default(0);
			$table->decimal('win_rate', 5, 2)->default(0);
			$table->enum('bet_type', ['pre_match', 'live', 'long_term']);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('stats');
	}
};
