package com.example.urlShortening.services;

import com.example.urlShortening.dto.ApiResponse;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;

import java.util.HashSet;
import java.util.Set;

@Service
public class TokenService {

    private final Set<String> tokenBlacklist = new HashSet<>();

    public void invalidateToken(String token) {
        tokenBlacklist.add(token);
    }

    public boolean isTokenInvalid(String token) {
        return tokenBlacklist.contains(token);
    }

    public ResponseEntity<ApiResponse<Void>> logoutUser(String token) {
        invalidateToken(token);
        return ResponseEntity.ok(ApiResponse.success("Logout successful", null));
    }
}