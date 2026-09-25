import api from '@/lib/api';
import type { Proyecto, ProyectoSchema } from '@/types/proyecto';

function toApiPayload(data: ProyectoSchema) {
  return {
    titulo: data.titulo,
    descripcion: data.descripcion,
    tecnologias: data.tecnologias,
    categoria_id: data.categoriaId,
    categoriaId: data.categoriaId,
    destacado: data.destacado,
    nivel: data.nivel,
    imagen_url: data.imagenUrl,
    imagenUrl: data.imagenUrl,
    demo_url: data.demoUrl,
    demoUrl: data.demoUrl,
    github_url: data.githubUrl,
    githubUrl: data.githubUrl,
    remove_imagen: (data as any).remove_imagen,
  };
}

/**
 * Crear proyecto enviando archivo directamente al servidor (storage local)
 */
export async function createProyectoForm(data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('imagen', file);
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  if (data.categoriaId != null) formData.append('categoria_id', String(data.categoriaId));
  formData.append('destacado', data.destacado ? '1' : '0');
  if (data.nivel) formData.append('nivel', data.nivel);
  if (data.demoUrl) formData.append('demo_url', data.demoUrl);
  if (data.githubUrl) formData.append('github_url', data.githubUrl);

  const { data: res } = await api.post('/proyectos', formData);
  return (res as any)?.data ?? res;
}

/**
 * Crear proyecto solo con datos JSON
 */
export async function createProyectoJson(data: ProyectoSchema): Promise<Proyecto> {
  const payload = toApiPayload(data);
  const { data: res } = await api.post('/proyectos', payload);
  return (res as any)?.data ?? res;
}

/**
 * Actualizar proyecto enviando archivo directamente al servidor (storage local)
 */
export async function updateProyectoForm(id: number, data: ProyectoSchema, file: File): Promise<Proyecto> {
  const formData = new FormData();
  formData.append('imagen', file);
  formData.append('titulo', data.titulo);
  formData.append('descripcion', data.descripcion);
  formData.append('tecnologias', data.tecnologias);
  if (data.categoriaId != null) formData.append('categoria_id', String(data.categoriaId));
  formData.append('destacado', data.destacado ? '1' : '0');
  if (data.nivel) formData.append('nivel', data.nivel);
  if (data.demoUrl) formData.append('demo_url', data.demoUrl);
  if (data.githubUrl) formData.append('github_url', data.githubUrl);

  const { data: res } = await api.post(`/proyectos/${id}`, formData);
  return (res as any)?.data ?? res;
}

/**
 * Actualizar proyecto solo con datos JSON
 */
export async function updateProyectoJson(id: number, data: ProyectoSchema): Promise<Proyecto> {
  const payload = toApiPayload(data);
  const { data: res } = await api.post(`/proyectos/${id}`, payload);
  return (res as any)?.data ?? res;
}

/**
 * Listar proyectos (soporta array plano o {data:[]} o {items:[]})
 */
export async function getProyectos(): Promise<Proyecto[]> {
  const { data: res } = await api.get('/proyectos');
  if (Array.isArray(res)) return res;
  if (Array.isArray((res as any)?.data)) return (res as any).data;
  if (Array.isArray((res as any)?.items)) return (res as any).items;
  return [];
}

/**
 * Eliminar proyecto
 */
export async function deleteProyecto(id: number): Promise<void> {
  await api.delete(`/proyectos/${id}`);
}
