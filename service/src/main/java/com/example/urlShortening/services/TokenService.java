package com.example.urlShortening.services;

import org.springframework.stereotype.Service;

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
}