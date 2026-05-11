# Changelog - Krono

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [0.1.5] - 2026-05-11

### Changed

- Se refactorizaron todos los formularios de configuración (`Tabata`, `EMOM`, `AMRAP`, `ForTime`, `Pace`, `Custom`) para utilizar componentes de UI reutilizables.
- Implementación de `DynamicList` y `ListItem` para gestionar de forma genérica la adición, eliminación y renderizado de ejercicios e intervalos.
- Unificación de los selectores en un único componente `Stepper` con variantes de layout (full/compact) y estilos (normal/highlighted).
- Transición de listas planas a un sistema de tarjetas (Cards) en formularios complejos para clarificar la relación entre ejercicios y sus parámetros.

## [0.1.4] - 2026-05-11

### Added
- Formulario de Ritmo (`PaceForm`) Nuevo modo para controlar el tempo de ejecución, permitiendo configurar repeticiones y segundos por repetición.
- Formulario Personalizado (`CustomForm`) Implementación de intervalos asimétricos que permite al usuario crear secuencias únicas de trabajo y descanso con duraciones independientes.

## [0.1.3] - 2026-05-11

### Added
- Formulario AMRAP (`AmrapForm`): Implementación minimalista enfocada exclusivamente en el tiempo límite (Time Cap).
- Formulario For Time (`ForTimeForm`): Configuración de cronómetro con límite de seguridad ajustable.
- Visualización de Unidades: Se añadió el sufijo "m" a los contadores de minutos para mejorar la claridad de la interfaz.

## [0.1.2] - 2026-05-11

### Added
- Formulario EMOM (`EmomForm`), Soporte completo para entrenamientos "Every Minute on the Minute", incluyendo configuración de ventanas de trabajo, rondas totales y secuencia de ejercicios alternados.

### Changed
- Refactorización del Modo Unilateral (Tabata y EMOM), Se eliminó el botón global por intervalo/ronda. Ahora el modo alternado (Izquierda/Derecha) se configura a nivel de *ejercicio individual* a través del nuevo botón toggle `[ I/D ]` / `[ L/R ]`, permitiendo mezclar movimientos estáticos y unilaterales en la misma secuencia sin errores lógicos en el motor de voz.

## [0.1.1] - 2026-05-11

### Added
- Formulario Avanzado de Tabata (`TabataForm`) Soporte para múltiples ciclos independientes en un solo entrenamiento
- Modo Unilateral por intervalo para llevar el control automático de ejercicios que alternan lados (Izquierda/Derecha).
- Descanso Activo Personalizado para definir movimientos durante el tiempo de descanso (ej. Planchas isométricas) en los tabatas
- Configuración de `MainLayout` para inyectar la función de retroceso (`onGoHome`) al Header y al BottomNav, permitiendo al usuario volver a la selección de modos en cualquier momento.

### Changed
- Migración a TypeScript, el proyecto fue reescrito para incluir tipado estricto, mejorando la robustez de los modelos de datos de los entrenamientos.
- Configuración de Diseño con tailwind
- Inclusion de `ConfigView` para actuar como un controlador que inyecta dinámicamente el formulario correcto según el modo seleccionado.
- Configuracion de multiidioma en los archivos (`es.ts`, `en.ts`).

## [0.1.0] - 2026-05-10

### Added
- Estructura inicial del proyecto con React y Vite.
- Configuración de entorno de desarrollo dockerizado.
- Dockerfile optimizado para Node 20-Alpine con compatibilidad libc6.
- Docker Compose para orquestación del frontend.
- README.md con documentación técnica inicial y hoja de ruta.
- Soporte para PWA (archivos base).