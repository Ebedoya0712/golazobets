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
		Schema::table('tipsters', function (Blueprint $table) {
			$table->dropColumn('subscription_price');
			$table->string('stripe_subscription_price_id')->after('sport_id')->nullable()->unique();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::table('tipsters', function (Blueprint $table) {
			$table->dropColumn('stripe_subscription_price_id');
		});
	}
};
