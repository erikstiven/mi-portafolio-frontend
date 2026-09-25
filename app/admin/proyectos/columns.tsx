'use client';

import type { ColumnaCrud } from '@/components/ui/TablaCrud';
import type { Proyecto } from '@/types/proyecto';

/** Columnas adaptadas a TablaCrud */
export const columnasProyecto: ColumnaCrud<Proyecto>[] = [
  {
    key: 'imagenUrl',
    label: 'Imagen',
    render: (p) =>
      p.imagenUrl ? (
        <img
          src={p.imagenUrl}
          alt={p.titulo}
          className="w-14 h-12 md:w-16 md:h-12 object-cover rounded border shadow-sm"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
      ) : (
        <span className="text-gray-400 text-xs">Sin imagen</span>
      ),
  },
  {
    key: 'titulo',
    label: 'Título',
  },
  {
    key: 'nivel',
    label: 'Nivel',
  },
  {
    key: 'categoria',
    label: 'Categoría',
    render: (proyecto) => proyecto.categoria?.nombre ?? '',
  },
  {
    key: 'destacado',
    label: 'Destacado',
    render: (proyecto) => (proyecto.destacado ? 'Sí' : 'No'),
  },
  // Si quieres ocultar alguna columna en móvil, añade hideOnMobile: true
];
