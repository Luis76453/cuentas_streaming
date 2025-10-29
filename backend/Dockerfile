

FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copiar archivos de configuración de Maven primero (para aprovechar caché de Docker)
COPY pom.xml .

# Descargar dependencias (se cachea si pom.xml no cambia)
RUN mvn dependency:go-offline -B

# Copiar el código fuente
COPY src ./src

# Compilar el proyecto y generar el JAR
RUN mvn clean package -DskipTests

# Etapa 2: Ejecución
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiar el JAR compilado desde la etapa de build
COPY --from=build /app/target/test2-0.0.1-SNAPSHOT.jar app_streamdeck.jar

# Exponer el puerto
EXPOSE 8080

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app_streamdeck.jar"]