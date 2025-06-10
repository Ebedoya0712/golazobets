<?php

namespace App\Traits;

use App\Traits\NotificationShortcodeTrait;

trait NotificationTrait
{

	use NotificationShortcodeTrait;

	/**
	 * Obtiene el namespace de la clase que está utilizando este trait.
	 */
	public function getNamespace(): string
	{
		return (new \ReflectionClass(get_called_class()))->getNamespaceName();
	}

	/**
	 * Obtiene el nombre del archivo sin extensión de la clase que está utilizando este trait.
	 */
	public function getFilename(): string
	{
		$reflection = new \ReflectionClass(get_called_class());
		return basename($reflection->getFileName(), '.php');
	}

	public function getNameSpaceAndFileName(): string
	{
		return $this->getNamespace() . '\\' . $this->getFilename();
	}

	/**
	 * Replaces shortcodes in the given content with corresponding values from a collection.
	 *
	 * @param string $content The content containing shortcodes to be replaced.
	 * @param string $shorcodeKey The key prefix used to identify relevant shortcodes within the content.
	 * @param mixed $collection An array or object containing values to replace the shortcodes with.
	 * 
	 * @return string The content with shortcodes replaced by their corresponding values.
	 */
	public function replaceShortcodes(string $content, string $shorcodeKey, $collection = []): string
	{

		$shortcodes = match ($shorcodeKey) {
			'role.' => $this->roleShortcodes(),
			'permission.' => $this->permissionShortcodes(),
			'user.' => $this->userShortcodes(),
			default => [],
		};


		if (str_contains($content, '[app.name]')) {
			$content = str_replace('[app.name]', config('app.name'), $content);
		}

		return preg_replace_callback('/\[(.*?)\]/', function ($matches) use ($shortcodes, $shorcodeKey, $collection) {
			$key = $matches[1];

			if (str_starts_with($key, $shorcodeKey)) {
				$field = explode('.', $key)[1] ?? null;
				$value = is_object($collection) ? ($collection->{$field} ?? null) : ($collection[$field] ?? null);
				return htmlspecialchars($value ?? $matches[0]);
			}

			return $shortcodes[$key] ?? $matches[0];
		}, $content);
	}
}
