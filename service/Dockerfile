# Build stage
FROM openjdk:17-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./mvnw clean package -DskipTests

# Run stage
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/urlShortening-0.0.1-SNAPSHOT.jar app.jar
COPY .env .env

# Expose the port your application will run on
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:8080/actuator/health || exit 1