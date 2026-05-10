# 1. Usamos una imagen ligera de Node.js
FROM node:20-alpine

# 2. Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# 3. Copiamos los archivos de definición de dependencias
# Se copian primero para aprovechar la caché de capas de Docker
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código del proyecto
COPY . .

# 6. Exponemos el puerto que usa Vite por defecto
EXPOSE 5173

# 7. Comando para iniciar el servidor de desarrollo de Vite
# Usamos --host para que Vite acepte conexiones externas al contenedor
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]