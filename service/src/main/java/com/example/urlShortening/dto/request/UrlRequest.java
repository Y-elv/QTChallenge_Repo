package com.example.urlShortening.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UrlRequest {

    @NotBlank(message = "Long URL cannot be blank")
    private String longUrl;
}
