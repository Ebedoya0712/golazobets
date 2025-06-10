<?php

namespace App\Enums\Picks;

enum Status: string
{
	case Pending = 'pending';
	case Won = 'won';
	case Lost = 'lost';
	case Void = 'void';
	case Cancelled = 'cancelled';
}
