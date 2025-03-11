package com.example.urlShortening.services;

import com.example.urlShortening.dto.ApiResponse;
import com.example.urlShortening.dto.request.UrlRequest;
import com.example.urlShortening.exception.CustomException;
import com.example.urlShortening.models.Url;
import com.example.urlShortening.models.User;
import com.example.urlShortening.repositories.UrlRepository;
import com.example.urlShortening.repositories.UserRepository;
import com.example.urlShortening.util.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class UrlService {

    @Autowired
    private UrlRepository urlRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public ResponseEntity<ApiResponse<Url>> shortenUrl(UrlRequest urlRequest, String token) {
        String userId = jwtTokenProvider.extractUserId(token);
        System.out.println("userId" +userId);
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create new Url entity from the request DTO
        Url url = new Url();
        url.setLongUrl(urlRequest.getLongUrl());
        url.setUser(user);
        url.setCreatedAt(LocalDateTime.now());
        url.setShortUrl(generateShortUrl(urlRequest.getLongUrl()));

        Url savedUrl = urlRepository.save(url);
        return ResponseEntity.ok(ApiResponse.success("URL shortened successfully", savedUrl));
    }

    public ResponseEntity<ApiResponse<Url>> getUrl(String shortUrl, String token) {
        String userId = jwtTokenProvider.extractUserId(token);
        Url url = urlRepository.findById(UUID.fromString(shortUrl))
                .orElseThrow(() -> new CustomException("URL not found", HttpStatus.NOT_FOUND));

        if (!url.getUser().getId().toString().equals(userId)) {
            throw new CustomException("You cannot view other users' URLs", HttpStatus.FORBIDDEN);
        }

        return ResponseEntity.ok(ApiResponse.success("URL retrieved successfully", url));
    }

    public ResponseEntity<ApiResponse<List<Url>>> getAllUrls(String token) {
        String userId = jwtTokenProvider.extractUserId(token);
        List<Url> urls = urlRepository.findByUserId(UUID.fromString(userId));
        return ResponseEntity.ok(ApiResponse.success("URLs retrieved successfully", urls));
    }

    private String generateShortUrl(String longUrl) {
        String domain = "https://bitly.gq/"; // Replace with your actual domain

        try {
            // Check if we already have a short URL for this long URL
            Optional<Url> existingUrl = urlRepository.findByLongUrl(longUrl);
            if (existingUrl.isPresent()) {
                return domain + existingUrl.get().getShortUrl();
            }

            // Create a MessageDigest instance for MD5
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] hashBytes = md.digest(longUrl.getBytes(StandardCharsets.UTF_8));

            // Convert to Base62 (alphanumeric) for URL-friendly string
            String base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            StringBuilder shortCode = new StringBuilder();

            // Use first 6 bytes of hash to create short URL
            for (int i = 0; i < 6; i++) {
                int value = hashBytes[i] & 0xFF;
                shortCode.append(base62Chars.charAt(value % 62));
            }

            String shortUrl = shortCode.toString();

            // Handle collisions - if the short URL already exists for a different long URL
            int attempts = 0;
            while (urlRepository.findByShortUrl(shortUrl).isPresent()) {
                // Add a suffix based on attempt number
                shortUrl = shortCode.toString() + base62Chars.charAt(attempts % 62);
                attempts++;

                // Prevent infinite loop (extremely unlikely)
                if (attempts > 5) {
                    // Just add current timestamp as suffix
                    shortUrl = shortCode.toString() + System.currentTimeMillis() % 1000;
                    break;
                }
            }

            return domain + shortUrl;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to generate short URL", e);
        }
    }
}