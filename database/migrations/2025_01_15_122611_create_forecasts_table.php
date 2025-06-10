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
		Schema::create('forecasts', function (Blueprint $table) {
			$table->id();
			$table->unsignedBigInteger('tipster_id');
			$table->unsignedBigInteger('sport_id');
			$table->unsignedBigInteger('bookie_id')->nullable();
			$table->enum('bet_type', ['pre_match', 'live', 'long_term']);
			$table->enum('sub_type', ['simple', 'combined']);
			$table->string('competition');
			$table->string('event');
			$table->string('pick');
			$table->decimal('stake', 5, 2);
			$table->decimal('odds', 5, 2);
			$table->dateTime('event_date');
			$table->text('analysis')->nullable();
			$table->string('screenshot_path')->nullable();
			$table->enum('status', ['pending', 'won', 'lost', 'void'])->default('pending');
			$table->decimal('result', 8, 2)->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('forecasts');
	}
};
