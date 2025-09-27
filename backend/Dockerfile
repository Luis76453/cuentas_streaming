FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/test2-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_streamdeck.jar
EXPOSE 8080
ENTRYPOINT [ "java", "-jar","app_streamdeck.jar" ]