<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

// use Illuminate\Bus\Queueable;
// use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Services\PickService;
use App\Models\Tipster;

class UpdateTipsterStatsJob implements ShouldQueue
{
	use Dispatchable,
		InteractsWithQueue,
		Queueable,
		SerializesModels;

	protected $tipster;
	public $tries = 3;
	public $timeout = 60;
	public $backoff = 30;

	/**
	 * Create a new job instance.
	 */
	public function __construct(Tipster $tipster)
	{
		$this->tipster = $tipster;
	}

	/**
	 * Execute the job.
	 */
	public function handle(PickService $pickService): void
	{
		$pickService->updateTipsterStats($this->tipster);
	}
}
