<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
	use HasFactory;

	protected $fillable = [
		'name',
		'subject',
		'body',
		'view',
		'type',
		'shortcodes'
	];

	public $casts = [
		'body' => 'json',
		'shortcodes' => 'json',
	];
}
