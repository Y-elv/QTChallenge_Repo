# Use OpenJDK as the base image for building
FROM openjdk:17-jdk-alpine AS build

# Set working directory inside container
WORKDIR /app

# Copy the application JAR file into the container
COPY ./target/urlShortening-0.0.1-SNAPSHOT.jar app.jar

# Use a minimal runtime base image
FROM openjdk:17-jdk-alpine

# Set working directory inside container
WORKDIR /app

# Copy the built JAR file from the build stage
COPY --from=build /app/app.jar app.jar

# Expose the application port
EXPOSE 8080

# Health check to ensure the app is running
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
    CMD wget -q -O /dev/null http://localhost:8080/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
