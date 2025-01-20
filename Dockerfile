# Use OpenJDK 21 image
FROM openjdk:21-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the .jar file into the container
COPY target/writing-prompt-generator-api-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your app will run on
EXPOSE 8080

# Command to run the app
CMD ["java", "-jar", "app.jar"]
