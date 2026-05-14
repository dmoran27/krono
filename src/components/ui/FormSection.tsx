import { ReactNode } from 'react';

interface Props {
  title: string;
  children: ReactNode;
}

export default function FormSection({ title, children }: Props) {
  return (
    <section className="mt-8 w-full">
      
      {/* Encabezado de la sección (Estilo Técnico) */}
      <div className=" mb-4 border-l-4 pl-8 border-primary">
        <h3 className="font-label-lg text-sm uppercase tracking-wider text-on-surface  mt-4 ">
          {title}
        </h3>
      </div>
      
      {/* Contenedor de los elementos del formulario */}
      <div className=" space-y-4">
        {children}
      </div>
      
    </section>
  );
}