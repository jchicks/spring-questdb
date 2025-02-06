#FROM maven:3.8.4-openjdk-17 AS build
FROM gradle:8.0-jdk17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and any other necessary configuration files
COPY ./build.gradle.kts /app
COPY ./settings.gradle.kts /app
COPY ./src /app/src

# Build the application
RUN gradle bootJar -x test


FROM ubuntu:24.10

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y wget gnupg2 software-properties-common && \
    wget -O- https://apt.corretto.aws/corretto.key | apt-key add - && \
    add-apt-repository 'deb https://apt.corretto.aws stable main' && \
    apt-get update && \
    apt-get install -y java-17-amazon-corretto-jdk && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN java -version

WORKDIR /app

EXPOSE 4040

#COPY build/libs/graphworker-1.0.jar graphworker.jar
COPY --from=build /app/build/libs/graph-worker-1.0.jar graphworker.jar

COPY src/main/resources/application.yaml /app/application.yaml

COPY volumes/questdb/data/db /app/data/db

ENV QUEST_DB_ROOT=/app/data/db

ENTRYPOINT ["java", "-jar", "graphworker.jar"]