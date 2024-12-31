package com.ryanrcampbell.writing.writingpromptgeneratorapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class WritingPromptGeneratorApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(WritingPromptGeneratorApiApplication.class, args);
	}

}
