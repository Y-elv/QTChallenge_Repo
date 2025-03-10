# Build stage
FROM maven:3.8.8-eclipse-temurin-21 AS builder
WORKDIR /build

# Copy files needed for build
COPY pom.xml ./
COPY src ./src

# Build application
RUN mvn clean package -DskipTests -q

# Runtime stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=builder /build/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]