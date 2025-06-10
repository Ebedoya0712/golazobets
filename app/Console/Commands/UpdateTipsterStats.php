<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Tipster;
use App\Models\TipsterStat;
use App\Models\Stat;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

use App\Jobs\UpdateTipsterStatsJob;
use App\Services\PickService;

/**
 * -------------------------------------------------------------------------------
 * NOTA:
 * -------------------------------------------------------------------------------
 * Este comando actualiza los picks de todos los tipsters. Esto 
 * es muy costoso en tiempo de ejecución. Se debe ejecutar solo cuando se
 * necesite actualizar los datos, preferentemente en entorno local.
 * -------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------
 * -------------------------------------------------------------------------------
 */

class UpdateTipsterStats extends Command
{

	private PickService $pickService;

	public function __construct(PickService $pickService)
	{
		parent::__construct();
		$this->pickService = $pickService;
	}

	/**
	 * The name and signature of the console command.
	 *
	 * @var string
	 */
	protected $signature = 'tipsters:update-stats';

	/**
	 * The console command description.
	 *
	 * @var string
	 */
	protected $description = 'Update tipsters statistics';


	public function handle()
	{

		$tipsters = Tipster::get();

		foreach ($tipsters as $tipster) {
			UpdateTipsterStatsJob::dispatch($tipster);
		}

		$this->info('Tipster statistics updated successfully.');
	}
}
