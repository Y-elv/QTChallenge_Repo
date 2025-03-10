package com.example.urlShortening;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

public class UrlShorteningApplication {
	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		SpringApplication.run(UrlShorteningApplication.class, args);
	}
}
