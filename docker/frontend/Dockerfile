# ==========================================
# ETAPA 1: Construcción (Builder)
# ==========================================
FROM node:20-alpine as builder
WORKDIR /app

# Instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el código y compilamos para producción
COPY . .

# Recibe el dominio como argumento al construir la imagen
ARG VITE_APP_DOMAIN
ENV VITE_APP_DOMAIN=$VITE_APP_DOMAIN
RUN npm run build

# ==========================================
# ETAPA 2: Producción (Servidor Web)
# ==========================================
FROM nginx:alpine

# Limpiamos los archivos por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiamos la carpeta 'dist' (resultado del build) desde la Etapa 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiamos nuestra configuración personalizada de Nginx
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80 estándar de la web
EXPOSE 80

# Iniciamos Nginx
CMD ["nginx", "-g", "daemon off;"]