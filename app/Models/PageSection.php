<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PageSection extends Model
{
	/** @use HasFactory<\Database\Factories\PageSectionFactory> */
	use HasFactory;

	protected $fillable = ['name', 'title', 'model_type', 'items_count'];

	public function items()
	{
		return $this->hasMany(SectionItem::class);
	}

	public function getSelectedItems()
	{
		$items = $this->items()
			->orderBy('sort_order')
			->get();

		// Cargar los modelos reales
		$modelItems = collect();
		foreach ($items as $item) {
			$modelClass = $item->model_type;
			$modelItem = $modelClass::find($item->model_id);
			if ($modelItem) {
				$modelItems->push($modelItem);
			}
		}

		return $modelItems;
	}
}
