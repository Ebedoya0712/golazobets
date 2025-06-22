<?php

namespace App\Observers;

use App\Models\Pick;
use App\Services\StatService;

class PickObserver
{
    public function updated(Pick $pick): void
    {
        // Si el estado cambia a uno resuelto (y no es cancelada ni pendiente)
        if (in_array($pick->status, ['won', 'lost', 'void'])) {
            $tipster = $pick->tipster;

            // Puedes inyectar el servicio si usas contenedor, o usar manualmente
            app(StatService::class)->updateTipsterStats($tipster);
        }
    }
}
