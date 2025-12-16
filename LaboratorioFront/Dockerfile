# ---------- Etapa 1: Build de Angular ----------
FROM node:20 AS build

WORKDIR /app

# Copiar package.json + package-lock y hacer install
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir Angular en modo producción
RUN npm run build

# ---------- Etapa 2: Servir con NGINX ----------
FROM nginx:stable-alpine

# Copiar configuración personalizada de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build generado al directorio público de NGINX
COPY --from=build /app/dist/LaboratorioFront/browser /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]
