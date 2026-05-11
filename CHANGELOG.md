# Changelog - Krono

Todos los cambios notables en este proyecto serán documentados en este archivo.

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