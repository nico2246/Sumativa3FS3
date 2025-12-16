# Stage 1: Build
FROM maven:3.9.2-eclipse-temurin-17 AS build
WORKDIR /app

# Copiamos solo el pom para descargar dependencias primero (caching)
COPY pom.xml .
RUN mvn dependency:go-offline

# Copiamos el código fuente
COPY src ./src

# Construimos el proyecto
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

# Copiamos el jar desde el stage de build
COPY --from=build /app/target/*.jar app.jar

# Copiamos la carpeta del wallet de Oracle
COPY oracle-wallet /app/oracle-wallet

# Exponemos el puerto del microservicio
EXPOSE 8082

# Variable de entorno para la ubicación del wallet
ENV TNS_ADMIN=/app/oracle-wallet/Wallet_PEJAJC0XXEX9Q5HH

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]
