# Use official OpenJDK 17 image with JDK
FROM eclipse-temurin:17-jdk

# Set working directory inside the container
WORKDIR /app

# Copy all project files into container
COPY . .

# Build the project using Maven wrapper, skip tests for faster build
RUN ./mvnw clean package -DskipTests

# Expose port 8080 (default for many Java apps)
EXPOSE 8080

# Run the built jar file
CMD ["java", "-jar", "target/webserver-demo-0.0.1-SNAPSHOT.jar"]