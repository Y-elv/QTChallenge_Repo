package com.example.urlShortening.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;

@Data
public class UrlDto {

    @NotBlank
    private String longUrl;

    private String shortUrl;

    private int clickCount;
}