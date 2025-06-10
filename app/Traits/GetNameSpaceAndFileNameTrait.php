<?php

namespace App\Traits;

trait GetNameSpaceAndFileNameTrait
{
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
}
