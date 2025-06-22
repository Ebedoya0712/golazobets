<?php

namespace App\Services;

use App\Data\StatData;
use App\Models\Tipster;
use App\Models\Pick;
use App\Models\TipsterStat;
use App\Models\User;

class StatService
{

	public function updateTipsterStats(Tipster $tipster): void
{
    // Obtener solo picks resueltos (excluye pendientes y canceladas)
    $picks = $tipster->picks()
        ->whereIn('status', ['won', 'lost', 'void']) // 'void' = nula
        ->get();

    $totalBets = $picks->count();

    if ($totalBets === 0) {
        // Si no hay picks válidos, reinicia stats a cero
        $tipster->tipster_stats()->updateOrCreate([], [
            'total_bet'      => 0,
            'profit'         => 0,
            'yield'          => 0,
            'average_stake'  => 0,
            'win_rate'       => 0,
        ]);
        return;
    }

    $totalStakes = $picks->sum('stake');
    $totalProfit = $picks->sum('profit');
    $wonCount = $picks->where('status', 'won')->count();

    $yield = $totalStakes > 0 ? ($totalProfit / $totalStakes) * 100 : 0;
    $averageStake = $totalBets > 0 ? $totalStakes / $totalBets : 0;
    $winRate = ($wonCount / $totalBets) * 100;

    $tipster->tipster_stats()->updateOrCreate([], [
        'total_bet'      => $totalBets,
        'profit'         => $totalProfit,
        'yield'          => round($yield, 2),
        'average_stake'  => round($averageStake, 2),
        'win_rate'       => round($winRate, 2),
    ]);
}

	public function getStatsByUsername(string $username)
	{
		$user = User::where('username', $username)->first();
		$stats = $user
			->tipster
			->stats
			->toArray();
		$stats = array_map(fn($stat) => StatData::from($stat), $stats);

		return $stats;
	}
}
