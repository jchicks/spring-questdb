plugins {
	java
	id("org.springframework.boot") version "3.3.0"
	id("io.spring.dependency-management") version "1.1.5"
//	id("com.bmuschko.docker-java-application") version "9.4.0"
}

group = "com.jchsolutions"
version = "1.0"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("org.apache.kafka:kafka-streams")
	implementation("org.springframework.kafka:spring-kafka")
	implementation("org.questdb:questdb:8.0.0")
	implementation("org.jooq:jooq:3.19.9")
	implementation(kotlin("stdlib"))


	compileOnly("org.projectlombok:lombok")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testImplementation("io.projectreactor:reactor-test")
	testImplementation("org.springframework.kafka:spring-kafka-test")
//	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
	testImplementation(platform("org.junit:junit-bom:5.9.1"))
	testImplementation("org.junit.jupiter:junit-jupiter")
}

tasks.withType<Test> {
	useJUnitPlatform()
}

//docker {
//	buildDir = project.buildDir.resolve("docker") // Customize if needed
//	images {
//		apply(from = "graphworkerImage") // Separate configuration for readability
//	}
//}

//tasks.bootJar {
//	archiveBaseName.set("graphworker")
//	archiveVersion.set(version as String)
//	mainClass = "com.jchsolutions.graphworker.GraphWorkerApplication"  // Adjust the main class if necessary
//}
//
//docker {
//	javaApplication {
//		baseImage.set("ubuntu:24.10")
//		maintainer.set("jerryhicksumd@gmail.com")
//		ports.set(listOf(4040))
//		images.set(listOf("jerryhicks/graphworker:0.1.2"))
//		args.set(listOf("--QUEST_DB_ROOT=/app/data/db"))
//	}
//}
//
//
//tasks.register<com.bmuschko.gradle.docker.tasks.image.DockerBuildImage>("buildDockerImage") {
//	dependsOn(tasks.getByName("bootJar"))
//	inputDir.set(file("."))
//	images.add("jerryhicks/graphworker:0.1.2")
//}
//
//tasks.register<com.bmuschko.gradle.docker.tasks.image.DockerPushImage>("pushDockerImage") {
//	dependsOn(tasks.getByName("buildDockerImage"))
//	images.set(listOf("jerryhicks/graphworker:0.1.0"))
//}