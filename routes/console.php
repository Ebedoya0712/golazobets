<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

// Artisan::command('inspire', function () {
// 	$this->comment(Inspiring::quote());
// })->purpose('Display an inspiring quote')->hourly();


// This command will run daily to clean up old entries in the Telescope database
// Schedule::command('telescope:prune')->daily();


/**
 * Schedule the tipsters stats update command to run hourly
 * This command updates statistics for all tipsters in the system
 * 
 * @return void
 * 
 * NOTE: This schedule has been deprecated because of limitations 
 * on server resources!!!!.
 * I just let it here for reference.
 * 
 * 
 */
// Schedule::command('tipsters:update-stats')
// 	->hourly()
// 	->withoutOverlapping(60) // Lock expires after 60 minutes
// 	->runInBackground()
// 	->onOneServer()
// 	->before(function () {
// 		// Log when the command starts
// 		\Illuminate\Support\Facades\Log::info('Tipsters stats update started');
// 	})
// 	->after(function () {
// 		// Log when the command completes successfully
// 		\Illuminate\Support\Facades\Log::info('Tipsters stats update completed');
// 	})
// 	->onFailure(function () {
// 		// Log when the command fails
// 		\Illuminate\Support\Facades\Log::error('Tipsters stats update failed');
// 	});
