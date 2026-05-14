# Kronos

Una **Progressive Web App (PWA)** minimalista y de alto rendimiento construida con **React** y **TypeScript**, diseñada para la gestión de intervalos de alta intensidad (WODs) con asistencia de voz y audio profesional. Ideal para rutinas funcionales, levantamientos y entrenamientos de alta intensidad.

## Características Principales

*   **Asistencia por Voz Integrada:** Utiliza la Web Speech API nativa para dictar el nombre de los ejercicios, transiciones y conteo de repeticiones sin necesidad de mirar la pantalla.
*   **Diseño PWA Mobile-First:** Interfaz de alto contraste y "Dark Mode" optimizada para pantallas táctiles, manos sudadas y legibilidad a distancia.
*   **Arquitectura Robusta:** Código refactorizado bajo estándares estrictos de TypeScript para evitar errores en tiempo de ejecución.
*   **Configuración Global & UI:**
    *   **Internacionalización (i18n):** Soporte completo para Inglés y Español.
    *   **Gestión de Temas:** Modos Claro y Oscuro con persistencia.
    *   **Controles Granulares:** Activa o desactiva la voz y los sonidos de forma independiente.
*   **6 Modalidades de Entrenamiento:**
    *   **Tabata / Intervalos:** Ciclos de trabajo y descanso predefinidos.
    *   **EMOM:** (Every Minute on the Minute) Secuencias dinámicas por minuto.
    *   **AMRAP:** Cuenta regresiva con tiempo límite fijo.
    *   **For Time:** Cronómetro progresivo con opción de Time Cap.
    *   **Custom WOD:** Bloques de trabajo asimétricos y personalizados.
    *   **Pacer (Metrónomo):** Conteo automático de repeticiones según una cadencia de tiempo específica (ej. 1 rep cada 3 segundos).

## Stack Tecnológico

*   **Core:** React 18, Vite, TypeScript (Strict Mode).
*   **Audio:** Web Audio API & Web Speech API.
*   **Estilos:** Tailwind CSS.
*   **Infraestructura:** Docker (Multi-stage build), Nginx (Alpine).

## Despliegue con Docker (Recomendado)

El proyecto utiliza **Docker Profiles** para separar los entornos.

### Prerrequisitos
*   [Docker](https://www.docker.com/) instalado.
*   [Docker Compose](https://docs.docker.com/compose/) instalado.

### Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone git@github.com:dmoran27/kronos.git
```
```bash
cd kronos
```

2. Variables de Entorno
Crea un archivo `.env` en la raíz:
```env
PORT_WEB_PROD=8080
COMPOSE_PROFILES=production 

3. Construye y levanta el contenedor en segundo plano:

```bash
docker-compose up -d --build
```

3. Accede a la aplicación en tu navegador:

```bash
http://localhost
```

4. Para detener el contenedor:

```bash
docker-compose down
```

## Desarrollo Local (Sin Docker)

Si deseas correr el entorno de desarrollo con Hot Reload para hacer cambios rápidos en el código:

1. Instala las dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Validar Tipos (Build Check): 

```bash
npm run build
```

## Desarrollo Local (Sin Docker)

Consulta el historial de cambios en el [CHANGELOG.md](./CHANGELOG.md).