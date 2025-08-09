'use client';

import SeccionHero from '@/components/SeccionHero';
import SeccionExperiencia from '@/components/SeccionExperiencia';
import SeccionProyectos from '@/components/SeccionProyectos';
import SeccionTecnologias from '@/components/SeccionTecnologias';
import SeccionSobreMiSimple from '@/components/SeccionSobreMiSimple';
import Footer from '@/components/Footer';

import { useExperiencias } from '@/hooks/useExperiencias';
import { useProyectos } from '@/hooks/useProyectos';
import { useCategorias } from '@/hooks/useCategorias';
import { SOBRE_MI } from '@/data/sobreMi';

export default function LandingPage() {
  const experiencias = useExperiencias();
  const proyectos = useProyectos();
  const categorias = useCategorias();

  return (
    <>
      {/* HERO full-bleed */}
      <SeccionHero />

      {/* Contenido con el mismo container */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
        <SeccionExperiencia experiencias={experiencias} />
        <SeccionProyectos proyectos={proyectos} categorias={categorias} />
      </div>

      {/* Estas secciones ya traen su propio max-w, colócalas fuera */}
      <SeccionSobreMiSimple {...SOBRE_MI} />
      <SeccionTecnologias />

      <Footer />
    </>
  );
}
