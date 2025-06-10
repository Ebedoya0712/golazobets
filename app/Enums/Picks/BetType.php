<?php

namespace App\Enums\Picks;

enum BetType: string
{
	case PreMatch = 'pre_match';
	case Live = 'live';
	case LongTerm = 'long_term';
}
