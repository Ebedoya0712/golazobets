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
		Schema::create('accounts', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->onDelete('cascade');

			// Preferences
			$table->string('language')->nullable();
			$table->string('colorMode')->nullable();

			// Tipsters
			$table->text('bio')->nullable();
			$table->text('description_service')->nullable();
			$table->text('description_market')->nullable();
			$table->text('description_picks')->nullable();
			$table->text('publishing_time')->nullable();
			$table->text('stake_preference')->nullable();

			$table->string('telegram_channel')->nullable();
			$table->string('x_user')->nullable();
			$table->string('facebook_user')->nullable();
			$table->string('instagram_user')->nullable();
			$table->string('telegram_user')->nullable();
			$table->string('rrss')->nullable();

			$table->boolean('communications_consent')->default(true)->nullable();

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('accounts');
	}
};
