# Krono

Una Progressive Web App (PWA) minimalista construida con React, diseñada para gestionar intervalos de entrenamiento y marcar el ritmo (Pacer) mediante asistencia de voz. Ideal para rutinas funcionales, levantamientos y entrenamientos de alta intensidad.

## Características Principales

*   **Asistencia por Voz Integrada:** Utiliza la Web Speech API nativa para dictar el nombre de los ejercicios, transiciones y conteo de repeticiones sin necesidad de mirar la pantalla.
*   **Diseño PWA Mobile-First:** Interfaz de alto contraste y "Dark Mode" optimizada para pantallas táctiles, manos sudadas y legibilidad a distancia.
*   **6 Modalidades de Entrenamiento:**
    *   **Tabata / Intervalos:** Ciclos de trabajo y descanso predefinidos.
    *   **EMOM:** (Every Minute on the Minute) Secuencias dinámicas por minuto.
    *   **AMRAP:** Cuenta regresiva con tiempo límite fijo.
    *   **For Time:** Cronómetro progresivo con opción de Time Cap.
    *   **Custom WOD:** Bloques de trabajo asimétricos y personalizados.
    *   **Pacer (Metrónomo):** Conteo automático de repeticiones según una cadencia de tiempo específica (ej. 1 rep cada 3 segundos).

## Stack Tecnológico

*   **Frontend:** React, Vite
*   **Voz:** Web Speech API (Nativa)
*   **Despliegue:** Docker, Nginx (Alpine)

## Despliegue con Docker (Recomendado)

El proyecto está preparado para ser dockerizado, utilizando un contenedor ligero de Nginx para servir los archivos estáticos generados por Vite.

### Prerrequisitos
*   [Docker](https://www.docker.com/) instalado.
*   [Docker Compose](https://docs.docker.com/compose/) instalado.

### Instalación y Ejecución

1. Clona el repositorio:
```bash
git clone git@github.com:dmoran27/krono.git
```
```bash
cd krono
```

2. Construye y levanta el contenedor en segundo plano:

```bash
docker-compose up -d --build
```

3. Accede a la aplicación en tu navegador:

```bash
http://localhost:8080
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