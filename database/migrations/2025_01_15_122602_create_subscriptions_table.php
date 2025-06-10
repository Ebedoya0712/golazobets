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
		Schema::create('subscriptions', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained('users')->onDelete('cascade');
			$table->foreignId('tipster_id')->constrained('tipsters')->onDelete('cascade');
			$table->enum('subscription_type', ['premium', 'free']);
			$table->unsignedBigInteger('payment_id')->nullable();
			$table->date('start_date');
			$table->date('end_date')->nullable();
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('subscriptions');
	}
};
