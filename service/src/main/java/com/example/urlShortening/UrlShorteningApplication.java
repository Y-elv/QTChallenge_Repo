package com.example.urlShortening;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;


@SpringBootApplication
public class UrlShorteningApplication {
	public static void main(String[] args) {
		SpringApplication.run(UrlShorteningApplication.class, args);
	}
}
