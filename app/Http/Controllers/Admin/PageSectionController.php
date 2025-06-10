<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\PageSection;
use App\Models\SectionItem;

class PageSectionController extends Controller
{

	public function homePage()
	{
		$sections = PageSection::all();
		return Inertia::render('admin/staticPages/HomePage', compact('sections'));
	}



	// public function edit($id)
	// {
	// 	$section = PageSection::findOrFail($id);

	// 	// Obtener todos los modelos disponibles según el tipo
	// 	$modelClass = $section->model_type;
	// 	$availableItems = $modelClass::all();

	// 	// Obtener IDs de items ya seleccionados
	// 	$selectedItemIds = $section->items()->pluck('model_id')->toArray();

	// 	return view('admin.sections.edit', compact('section', 'availableItems', 'selectedItemIds'));
	// }

	// public function update(Request $request, $id)
	// {
	// 	$section = PageSection::findOrFail($id);

	// 	// Actualizar propiedades básicas
	// 	$section->update([
	// 		'title' => $request->title,
	// 		'items_count' => $request->items_count
	// 	]);

	// 	// Eliminar items anteriores
	// 	$section->items()->delete();

	// 	// Guardar nuevos items seleccionados
	// 	if ($request->has('selected_items')) {
	// 		foreach ($request->selected_items as $index => $itemId) {
	// 			SectionItem::create([
	// 				'page_section_id' => $section->id,
	// 				'model_id' => $itemId,
	// 				'model_type' => $section->model_type,
	// 				'sort_order' => $index
	// 			]);
	// 		}
	// 	}

	// 	return redirect()->route('admin.sections.index')
	// 		->with('success', 'Sección actualizada correctamente');
	// }
}
