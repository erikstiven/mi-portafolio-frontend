// hooks/useProyectos.ts
'use client';

import { useEffect, useState } from 'react';
import { getProyectos } from '@/services/proyectoService';
import type { Proyecto } from '@/types/proyecto';

export function useProyectos(params?: { page?: number; pageSize?: number }) {
  const [data, setData] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      try {
        const items = await getProyectos(params); // ← ya retorna Proyecto[]
        if (alive) setData(items);
      } catch (e) {
        if (alive) {
          setError(e);
          setData([]);
        }
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [params?.page, params?.pageSize]);

  return { proyectos: data, loading, error };
}
