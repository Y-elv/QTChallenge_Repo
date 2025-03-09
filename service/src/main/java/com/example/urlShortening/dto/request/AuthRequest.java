package com.example.urlShortening.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // Getters and Setters
}