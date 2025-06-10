<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SectionItem extends Model
{
	/** @use HasFactory<\Database\Factories\SectionItemFactory> */
	use HasFactory;

	protected $fillable = ['page_section_id', 'model_id', 'model_type', 'sort_order'];

	public function pageSection()
	{
		return $this->belongsTo(PageSection::class);
	}
}
